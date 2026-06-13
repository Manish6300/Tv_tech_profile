const express = require('express');
const router = express.Router();
const { serveImage } = require('../controllers/galleryController');

// Serve any image stored in GridFS by filename
router.get('/:filename', serveImage);

module.exports = router;
