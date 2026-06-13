const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  customerName:       { type: String, required: true, trim: true },
  phone:              { type: String, required: true, trim: true },
  address:            { type: String, required: true, trim: true },
  latitude:           { type: Number, default: null },
  longitude:          { type: Number, default: null },
  mapLink:            { type: String, default: '' },
  tvBrand:            { type: String, required: true },
  tvModel:            { type: String, default: '' },
  problemDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
