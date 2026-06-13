const Gallery = require('../models/Gallery');
const { getGridFSBucket } = require('../utils/gridfs');
const mongoose = require('mongoose');
const path = require('path');
const { Readable } = require('stream');

// Serve image from GridFS by filename
exports.serveImage = async (req, res) => {
  try {
    const bucket = getGridFSBucket();
    const files = await bucket.find({ filename: req.params.filename }).toArray();
    if (!files || files.length === 0) return res.status(404).json({ message: 'Image not found' });
    res.set('Content-Type', files[0].contentType || 'image/jpeg');
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.on('error', () => res.status(404).json({ message: 'Stream error' }));
    downloadStream.pipe(res);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getGallery = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
    const bucket = getGridFSBucket();
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
      metadata: {
        category: req.body.category || 'general',
        caption: req.body.caption || '',
        uploadedAt: new Date()
      }
    });
    await new Promise((resolve, reject) => {
      const readable = Readable.from(req.file.buffer);
      readable.pipe(uploadStream);
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });
    const image = await Gallery.create({
      filename,
      fileId: uploadStream.id,
      imageUrl: `/api/images/${filename}`,
      caption: req.body.caption || '',
      category: req.body.category || 'repair',
      size: req.file.size,
      mimetype: req.file.mimetype
    });
    res.status(201).json({ success: true, data: image });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    // Delete from GridFS
    if (image.fileId) {
      try {
        const bucket = getGridFSBucket();
        await bucket.delete(new mongoose.Types.ObjectId(image.fileId));
      } catch (e) { console.log('GridFS delete warn:', e.message); }
    }
    await image.deleteOne();
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
