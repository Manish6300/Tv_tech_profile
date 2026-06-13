require('dotenv').config();
require('./utils/dnsfix');

const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads (legacy fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/services', require('./routes/services'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/social-links', require('./routes/socialLinks'));
app.use('/api/images', require('./routes/images'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    storage: 'MongoDB GridFS'
  });
});

// Serve React Frontend (Vite Build)
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error Handler
app.use(errorHandler);

module.exports = app;