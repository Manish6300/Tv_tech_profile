const Service = require('../models/Service');
const { getGridFSBucket } = require('../utils/gridfs');
const mongoose = require('mongoose');
const path = require('path');
const { Readable } = require('stream');

const deleteGridFSFile = async (fileId) => {
  if (!fileId) return;
  try {
    const bucket = getGridFSBucket();
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
  } catch (e) { console.log('GridFS delete warn:', e.message); }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createService = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon || 'FaTv',
      price: req.body.price || 'Contact for Price',
      isActive: req.body.isActive !== 'false',
      order: req.body.order || 0
    };
    
    if (req.file) {
      try {
        const bucket = getGridFSBucket();
        const ext = path.extname(req.file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        
        const uploadStream = bucket.openUploadStream(filename, {
          contentType: req.file.mimetype
        });
        
        const fileId = uploadStream.id;
        console.log('📤 GridFS Upload started:', { filename, fileId });
        
        await new Promise((resolve, reject) => {
          const readable = Readable.from(req.file.buffer);
          readable.pipe(uploadStream);
          uploadStream.on('finish', () => {
            console.log('✅ GridFS Upload finished:', { filename, fileId });
            resolve();
          });
          uploadStream.on('error', (err) => {
            console.error('❌ GridFS Upload error:', err.message);
            reject(err);
          });
        });
        
        data.image = `/api/images/${filename}`;
        data.imageFileId = fileId;
        data.imageFilename = filename;
        console.log('📝 Service data prepared:', { image: data.image, imageFileId: fileId });
      } catch (uploadErr) {
        console.error('❌ File upload failed:', uploadErr.message);
        throw uploadErr;
      }
    }
    
    const service = await Service.create(data);
    console.log('✅ Service created:', { id: service._id, title: service.title, image: service.image, imageFileId: service.imageFileId });
    res.status(201).json({ success: true, data: service });
  } catch (err) { 
    console.error('❌ Service creation error:', err.message);
    res.status(500).json({ message: err.message }); 
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const updates = {
      title: req.body.title || service.title,
      description: req.body.description || service.description,
      icon: req.body.icon || service.icon,
      price: req.body.price || service.price,
      isActive: req.body.isActive !== undefined ? req.body.isActive !== 'false' : service.isActive,
      order: req.body.order !== undefined ? req.body.order : service.order
    };

    if (req.file) {
      try {
        await deleteGridFSFile(service.imageFileId);
        
        const bucket = getGridFSBucket();
        const ext = path.extname(req.file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        
        const uploadStream = bucket.openUploadStream(filename, {
          contentType: req.file.mimetype
        });
        
        const fileId = uploadStream.id;
        console.log('📤 GridFS Update started:', { filename, fileId });
        
        await new Promise((resolve, reject) => {
          const readable = Readable.from(req.file.buffer);
          readable.pipe(uploadStream);
          uploadStream.on('finish', () => {
            console.log('✅ GridFS Update finished:', { filename, fileId });
            resolve();
          });
          uploadStream.on('error', (err) => {
            console.error('❌ GridFS Update error:', err.message);
            reject(err);
          });
        });
        
        updates.image = `/api/images/${filename}`;
        updates.imageFileId = fileId;
        updates.imageFilename = filename;
        console.log('📝 Service update data prepared:', { image: updates.image, imageFileId: fileId });
      } catch (uploadErr) {
        console.error('❌ File update failed:', uploadErr.message);
        throw uploadErr;
      }
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });
    console.log('✅ Service updated:', { id: updated._id, title: updated.title, image: updated.image, imageFileId: updated.imageFileId });
    res.json({ success: true, data: updated });
  } catch (err) { 
    console.error('❌ Service update error:', err.message);
    res.status(500).json({ message: err.message }); 
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    await deleteGridFSFile(service.imageFileId);
    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
