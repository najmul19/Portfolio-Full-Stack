const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('admin'), uploadFile);

module.exports = router;
