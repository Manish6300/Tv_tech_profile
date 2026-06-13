const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  technicianName: { type: String, default: 'Pavan ' },
  title: { type: String, default: 'Professional Multi-Brand TV Technician' },
  tagline: { type: String, default: 'Fast, Reliable & Affordable TV Repair Services' },
  biography: { type: String, default: 'With over 10 years of hands-on experience repairing all major TV brands, I deliver quality doorstep service with genuine parts and warranty.' },
  profileImage: { type: String, default: '' },           // API serve URL
  profileImageFileId: { type: mongoose.Schema.Types.ObjectId }, // GridFS _id
  profileImageFilename: { type: String, default: '' },   // GridFS filename
  experience: { type: Number, default: 3 },
  tvsRepaired: { type: Number, default: 500 },
  happyCustomers: { type: Number, default: 4800 },
  serviceLocations: { type: Number, default: 15 },
  rating: { type: Number, default: 4.9 },
  phone: { type: String, default: '+91 9959714805' },
  whatsapp: { type: String, default: '+91 9959714805' },
  email: { type: String, default: 'com' },
  address: { type: String, default: '2-6-530, Jaipuri Colony, Weaker Section Colony, Nagole, Hyderabad, Telangana 500068' },
  workshopLocation: { type: String, default: 'https://maps.app.goo.gl/3YFE4BocPjgbwsZt5' },
  serviceAreas: { type: String, default: 'Ghatkesar,Hyderabad, Secunderabad, Cyberabad, Kukatpally' },
  certifications: [{ type: String }],
  skills: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
