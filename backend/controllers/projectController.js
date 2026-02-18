const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        // Check if error is a Mongoose formatted object ID
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
exports.createProject = async (req, res, next) => {
    try {
        // Add user to req.body if needed, but not strictly required for project unless we track creator
        // req.body.user = req.user.id; 

        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            data: project,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
exports.updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Project not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
