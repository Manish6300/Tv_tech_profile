require('dotenv').config();
require('./utils/dnsfix');
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads (legacy fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/services', require('./routes/services'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/social-links', require('./routes/socialLinks'));
app.use('/api/images', require('./routes/images'));   // GridFS image serving

app.get('/api/health', (req, res) => res.json({ status: 'OK', storage: 'MongoDB GridFS' }));

app.use(errorHandler);

module.exports = app;
