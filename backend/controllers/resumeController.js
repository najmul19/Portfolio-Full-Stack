const asyncHandler = require('../middleware/asyncHandler');
const Resume = require('../models/Resume');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all resumes
// @route   GET /api/resumes
// @access  Public (only returns active if public, all if admin)
exports.getResumes = asyncHandler(async (req, res, next) => {
    let query = {};

    // If not admin, only show active resume
    // Note: We need to handle this based on auth middleware. 
    // Ideally public endpoint only gets active, admin gets all.
    // For now, let's just return all and filter in frontend or separate public endpoint.
    // Better: Public endpoint /api/resumes/active

    const resumes = await Resume.find().sort({ uploadedAt: -1 });

    res.status(200).json({
        success: true,
        count: resumes.length,
        data: resumes
    });
});

// @desc    Get active resume
// @route   GET /api/resumes/active
// @access  Public
exports.getActiveResume = asyncHandler(async (req, res, next) => {
    const resume = await Resume.findOne({ isActive: true });

    if (!resume) {
        return next(new ErrorResponse('No active resume found', 404));
    }

    res.status(200).json({
        success: true,
        data: resume
    });
});

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private/Admin
exports.createResume = asyncHandler(async (req, res, next) => {
    const resume = await Resume.create(req.body);

    res.status(201).json({
        success: true,
        data: resume
    });
});

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private/Admin
exports.updateResume = asyncHandler(async (req, res, next) => {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404));
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: resume
    });
});

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private/Admin
exports.deleteResume = asyncHandler(async (req, res, next) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404));
    }

    await resume.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
