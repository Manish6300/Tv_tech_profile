const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  filename: { type: String, required: true },       // GridFS filename
  fileId: { type: mongoose.Schema.Types.ObjectId },  // GridFS file _id
  imageUrl: { type: String, required: true },         // API serve URL
  category: {
    type: String,
    enum: ['technician', 'repair', 'workshop', 'customer', 'before', 'after'],
    default: 'repair'
  },
  caption: { type: String, default: '' },
  size: { type: Number, default: 0 },
  mimetype: { type: String, default: 'image/jpeg' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
