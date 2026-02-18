const Publication = require('../models/Publication');

// @desc    Get all publications
// @route   GET /api/publications
// @access  Public
exports.getPublications = async (req, res, next) => {
    try {
        const publications = await Publication.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: publications.length,
            data: publications,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single publication
// @route   GET /api/publications/:id
// @access  Public
exports.getPublication = async (req, res, next) => {
    try {
        const publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: publication,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new publication
// @route   POST /api/publications
// @access  Private (Admin only)
exports.createPublication = async (req, res, next) => {
    try {
        const publication = await Publication.create(req.body);

        res.status(201).json({
            success: true,
            data: publication,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update publication
// @route   PUT /api/publications/:id
// @access  Private (Admin only)
exports.updatePublication = async (req, res, next) => {
    try {
        let publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }

        publication = await Publication.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: publication,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete publication
// @route   DELETE /api/publications/:id
// @access  Private (Admin only)
exports.deletePublication = async (req, res, next) => {
    try {
        const publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }

        await publication.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Publication not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
