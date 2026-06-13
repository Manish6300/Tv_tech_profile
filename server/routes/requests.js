const express = require('express');
const router = express.Router();
const { getRequests, addRequest, updateStatus, deleteRequest } = require('../controllers/requestController');
const { protect } = require('../middleware/auth');
router.get('/', protect, getRequests);
router.post('/', addRequest);
router.put('/:id', protect, updateStatus);
router.delete('/:id', protect, deleteRequest);
module.exports = router;
