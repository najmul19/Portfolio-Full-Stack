const express = require('express');
const {
    getResumes,
    getActiveResume,
    createResume,
    updateResume,
    deleteResume
} = require('../controllers/resumeController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/active', getActiveResume); // Public
router.route('/').get(getResumes).post(protect, authorize('admin'), createResume);
router
    .route('/:id')
    .put(protect, authorize('admin'), updateResume)
    .delete(protect, authorize('admin'), deleteResume);

module.exports = router;
