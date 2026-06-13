require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📌 Connected to MongoDB');

    // Delete old admin
    const deleted = await Admin.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} old admin record(s)`);

    // Create new admin with new credentials
    const newAdmin = await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    });
    console.log('✅ New admin created successfully!');
    console.log(`📝 Username: ${newAdmin.username}`);
    console.log(`🔐 Password: ${process.env.ADMIN_PASSWORD}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

updateAdmin();
