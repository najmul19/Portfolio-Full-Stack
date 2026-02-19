const express = require('express');
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getTestimonials).post(protect, authorize('admin'), createTestimonial);
router
    .route('/:id')
    .put(protect, authorize('admin'), updateTestimonial)
    .delete(protect, authorize('admin'), deleteTestimonial);

module.exports = router;
