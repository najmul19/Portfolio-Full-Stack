const express = require('express');
const {
    getEducation,
    getSingleEducation,
    createEducation,
    updateEducation,
    deleteEducation,
} = require('../controllers/educationController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getEducation)
    .post(protect, authorize('admin'), createEducation);

router
    .route('/:id')
    .get(getSingleEducation)
    .put(protect, authorize('admin'), updateEducation)
    .delete(protect, authorize('admin'), deleteEducation);

module.exports = router;
