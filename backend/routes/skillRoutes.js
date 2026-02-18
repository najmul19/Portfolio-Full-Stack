const express = require('express');
const {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
} = require('../controllers/skillController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getSkills)
    .post(protect, authorize('admin'), createSkill);

router
    .route('/:id')
    .get(getSkill)
    .put(protect, authorize('admin'), updateSkill)
    .delete(protect, authorize('admin'), deleteSkill);

module.exports = router;
