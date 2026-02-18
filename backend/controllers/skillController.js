const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 });

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
exports.getSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: skill,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin only)
exports.createSkill = async (req, res, next) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            data: skill,
        });
    } catch (err) {
        // Handle duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: 'Skill already exists' });
        }
        next(err);
    }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin only)
exports.updateSkill = async (req, res, next) => {
    try {
        let skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }

        skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: skill,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin only)
exports.deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }

        await skill.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Skill not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
