const Profile = require('../models/Profile');
const { getGridFSBucket } = require('../utils/gridfs');
const mongoose = require('mongoose');
const path = require('path');
const { Readable } = require('stream');

exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json({ success: true, data: profile });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    const fields = ['technicianName','title','tagline','biography','experience',
      'tvsRepaired','happyCustomers','serviceLocations','rating','phone',
      'whatsapp','email','address','workshopLocation','serviceAreas'];
    fields.forEach(f => { if (req.body[f] !== undefined) profile[f] = req.body[f]; });

    if (req.body.certifications) {
      try { profile.certifications = JSON.parse(req.body.certifications); }
      catch { profile.certifications = req.body.certifications.split(',').map(s => s.trim()).filter(Boolean); }
    }
    if (req.body.skills) {
      try { profile.skills = JSON.parse(req.body.skills); }
      catch { profile.skills = req.body.skills.split(',').map(s => s.trim()).filter(Boolean); }
    }

    if (req.file) {
      const bucket = getGridFSBucket();
      // Delete old image from GridFS
      if (profile.profileImageFileId) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(profile.profileImageFileId));
        } catch (e) { console.log('Old image cleanup warn:', e.message); }
      }
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;
      const uploadStream = bucket.openUploadStream(filename, { contentType: req.file.mimetype });
      await new Promise((resolve, reject) => {
        Readable.from(req.file.buffer).pipe(uploadStream);
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
      profile.profileImage = `/api/images/${filename}`;
      profile.profileImageFileId = uploadStream.id;
      profile.profileImageFilename = filename;
    }

    await profile.save();
    res.json({ success: true, data: profile });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
