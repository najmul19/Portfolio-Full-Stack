const express = require('express');
const {
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
} = require('../controllers/achievementController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getAchievements).post(protect, authorize('admin'), createAchievement);
router
    .route('/:id')
    .put(protect, authorize('admin'), updateAchievement)
    .delete(protect, authorize('admin'), deleteAchievement);

module.exports = router;
