const Education = require('../models/Education');

// @desc    Get all education
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res, next) => {
    try {
        const education = await Education.find().sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: education.length,
            data: education,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
exports.getSingleEducation = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: education,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new education
// @route   POST /api/education
// @access  Private (Admin only)
exports.createEducation = async (req, res, next) => {
    try {
        const education = await Education.create(req.body);

        res.status(201).json({
            success: true,
            data: education,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private (Admin only)
exports.updateEducation = async (req, res, next) => {
    try {
        let education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }

        education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: education,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private (Admin only)
exports.deleteEducation = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }

        await education.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Education not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
