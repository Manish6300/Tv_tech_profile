const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
router.get('/', getProfile);
router.put('/', protect, upload.single('profileImage'), updateProfile);
module.exports = router;
