const express = require('express');
const {
    getAbout,
    createOrUpdateAbout,
} = require('../controllers/aboutController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getAbout)
    .post(protect, authorize('admin'), createOrUpdateAbout);

module.exports = router;
