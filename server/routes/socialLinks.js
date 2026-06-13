const express = require('express');
const router = express.Router();
const { getLinks, updateLinks } = require('../controllers/socialLinksController');
const { protect } = require('../middleware/auth');
router.get('/', getLinks);
router.put('/', protect, updateLinks);
module.exports = router;
