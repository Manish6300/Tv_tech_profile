const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Service = require('../models/Service');
const SocialLinks = require('../models/SocialLinks');

const CONTACT_PHONE = '+91 9959714805';
const CONTACT_PHONE_SPACED = '+91 99597 14805';
const CONTACT_WHATSAPP_LINK = 'https://wa.me/919959714805';
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/fdWQ5KHm966K8yqU8?g_st=awb';

const seedDB = async () => {
  // Seed Admin
  if (!(await Admin.findOne({ username: process.env.ADMIN_USERNAME }))) {
    await Admin.create({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
    console.log('✅ Admin seeded');
  }

  // Seed Profile
  if (!(await Profile.findOne())) {
    await Profile.create({
      technicianName: 'Pavan Kumar',
      address: '2-6-530, Jaipuri Colony, Weaker Section Colony, Nagole, Hyderabad, Telangana 500068',
      workshopLocation: 'https://maps.app.goo.gl/3YFE4BocPjgbwsZt5',
      biography: 'With over 10 years of hands-on experience, I specialize in repairing all major TV brands. I provide doorstep service across Hyderabad with genuine spare parts and service warranty.',
      certifications: ['Samsung Certified Technician', 'LG Authorized Service Partner', 'Sony Service Expert'],
      skills: ['LED TV Repair', 'Smart TV Repair', 'Panel Replacement', 'Motherboard Repair', 'Software Update']
    });
    console.log('✅ Profile seeded');
  }

  // Seed Services
  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      { title: 'LED TV Repair', description: 'Expert repair for all LED TV display, backlight and circuit issues.', icon: 'FaTv', order: 1 },
      { title: 'Smart TV Repair', description: 'Smart TV software and hardware repair for all brands and models.', icon: 'FaWifi', order: 2 },
      { title: 'Android TV Repair', description: 'Android OS issues, app crashes, and hardware repair services.', icon: 'FaMobileAlt', order: 3 },
      { title: 'Display Replacement', description: 'Cracked or damaged screen replacement with original panels.', icon: 'FaExpand', order: 4 },
      { title: 'Motherboard Repair', description: 'PCB and motherboard level repair for all TV brands.', icon: 'FaMicrochip', order: 5 },
      { title: 'Screen Issue Repair', description: 'Lines, flickering, dark patches and all screen problems fixed.', icon: 'FaDesktop', order: 6 },
      { title: 'Wall Mount Installation', description: 'Professional TV wall mounting with neat cable management.', icon: 'FaWrench', order: 7 },
      { title: 'Home Service', description: 'Convenient doorstep TV repair service across Hyderabad.', icon: 'FaHome', order: 8 },
      { title: 'Software Update', description: 'Firmware updates, factory reset and software troubleshooting.', icon: 'FaDownload', order: 9 },
      { title: 'Audio Problems', description: 'Speaker replacement and audio system repair services.', icon: 'FaVolumeUp', order: 10 },
      { title: 'HDMI Port Repair', description: 'HDMI port, USB port and connectivity issue repairs.', icon: 'FaPlug', order: 11 },
      { title: 'Remote & Sensor Repair', description: 'Remote control and IR sensor repair or replacement.', icon: 'FaBolt', order: 12 },
    ]);
    console.log('✅ Services seeded');
  }

  // Seed Social Links
  if (!(await SocialLinks.findOne())) {
    await SocialLinks.create({
      whatsapp: CONTACT_WHATSAPP_LINK,
      phone: CONTACT_PHONE_SPACED,
      maps: GOOGLE_MAPS_LINK
    });
    console.log('✅ Social links seeded');
  }

  await Profile.updateMany(
    {
      $or: [
        { phone: { $regex: '97040\\s?32707' } },
        { whatsapp: { $regex: '97040\\s?32707' } }
      ]
    },
    { $set: { phone: CONTACT_PHONE, whatsapp: CONTACT_PHONE } }
  );

  await SocialLinks.updateMany(
    {
      $or: [
        { phone: { $regex: '97040\\s?32707' } },
        { whatsapp: { $regex: '97040\\s?32707' } }
      ]
    },
    { $set: { phone: CONTACT_PHONE_SPACED, whatsapp: CONTACT_WHATSAPP_LINK } }
  );
};

module.exports = seedDB;
