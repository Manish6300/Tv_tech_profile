const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FaTv' },
  image: { type: String, default: '' },         // API serve URL
  imageFileId: { type: mongoose.Schema.Types.ObjectId }, // GridFS file _id
  imageFilename: { type: String, default: '' }, // GridFS filename
  price: { type: String, default: 'Contact for Price' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
