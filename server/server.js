const app = require('./app');
const connectDB = require('./config/db');
const seedDB = require('./utils/seed');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDB();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error(`💥 ${err.message}`);
    process.exit(1);
  }
};

startServer();
