const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema({
  whatsapp: { type: String, default: 'https://wa.me/919959714805' },
  instagram: { type: String, default: 'https://instagram.com' },
  facebook: { type: String, default: 'https://facebook.com' },
  youtube: { type: String, default: 'https://youtube.com' },
  maps: { type: String, default: 'https://maps.app.goo.gl/fdWQ5KHm966K8yqU8?g_st=awb' },
  phone: { type: String, default: '+91 99597 14805' }
}, { timestamps: true });

module.exports = mongoose.model('SocialLinks', socialLinksSchema);
