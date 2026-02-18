const express = require('express');
const {
    getExperiences,
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
} = require('../controllers/experienceController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getExperiences)
    .post(protect, authorize('admin'), createExperience);

router
    .route('/:id')
    .get(getExperience)
    .put(protect, authorize('admin'), updateExperience)
    .delete(protect, authorize('admin'), deleteExperience);

module.exports = router;
