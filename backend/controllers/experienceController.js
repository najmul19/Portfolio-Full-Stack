const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res, next) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
exports.getExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: experience,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new experience
// @route   POST /api/experiences
// @access  Private (Admin only)
exports.createExperience = async (req, res, next) => {
    try {
        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            data: experience,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private (Admin only)
exports.updateExperience = async (req, res, next) => {
    try {
        let experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }

        experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: experience,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private (Admin only)
exports.deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }

        await experience.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Experience not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
