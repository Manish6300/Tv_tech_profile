const mongoose = require('mongoose');

const explainMongoError = (err) => {
  const message = err && err.message ? err.message : '';

  if (err && (err.code === 'ENOTFOUND' || message.includes('ENOTFOUND'))) {
    console.error('   DNS could not resolve your MongoDB Atlas host.');
    console.error('   Check that MONGO_URI has the correct cluster hostname, for example:');
    console.error('   mongodb+srv://<user>:<password>@cluster0.xxxxxxx.mongodb.net/<dbname>');
    console.error('   If your network blocks Atlas DNS, try another network or set USE_PUBLIC_DNS=true in server/.env.');
    return;
  }

  if (message.includes('IP') || message.includes('whitelist')) {
    console.error('   Atlas rejected this network. Add your current IP in Atlas Network Access.');
    return;
  }

  if (message.includes('bad auth') || message.includes('Authentication failed')) {
    console.error('   MongoDB authentication failed. Check the username and password in MONGO_URI.');
  }
};

const connectDB = async (retries = 5) => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in server/.env');
  }

  for (let i = 1; i <= retries; i++) {
    try {
      let mongoUri = process.env.MONGO_URI;
      
      // If using SRV and DNS fails, try converting to direct connection
      if (mongoUri.includes('+srv') && i > 2) {
        console.log('⚠️  Retrying with direct connection (non-SRV)...');
        mongoUri = mongoUri.replace('+srv', '').replace(
          '/@',
          ':27017,cluster0-shard-00-01.376fnt6.mongodb.net:27017,cluster0-shard-00-02.376fnt6.mongodb.net:27017/@'
        );
      }
      
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.error(`❌ MongoDB attempt ${i}/${retries} failed: ${err.message}`);
      if (i === 1) explainMongoError(err);
      if (i === retries) {
        throw new Error('Could not connect to MongoDB');
      }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
};

module.exports = connectDB;
