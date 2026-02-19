const asyncHandler = require('../middleware/asyncHandler');
const Achievement = require('../models/Achievement');
const ErrorResponse = require('../utils/errorResponse');

exports.getAchievements = asyncHandler(async (req, res, next) => {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: achievements.length, data: achievements });
});

exports.createAchievement = asyncHandler(async (req, res, next) => {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: achievement });
});

exports.updateAchievement = asyncHandler(async (req, res, next) => {
    let achievement = await Achievement.findById(req.params.id);
    if (!achievement) return next(new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404));
    achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: achievement });
});

exports.deleteAchievement = asyncHandler(async (req, res, next) => {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return next(new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404));
    await achievement.deleteOne();
    res.status(200).json({ success: true, data: {} });
});
