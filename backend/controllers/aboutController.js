const About = require('../models/About');

// @desc    Get about details
// @route   GET /api/about
// @access  Public
exports.getAbout = async (req, res, next) => {
    try {
        // There should typically be only one about document
        const about = await About.findOne();

        res.status(200).json({
            success: true,
            data: about || {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create or Update about details
// @route   POST /api/about
// @access  Private (Admin only)
exports.createOrUpdateAbout = async (req, res, next) => {
    try {
        let about = await About.findOne();

        if (about) {
            // Update existing
            about = await About.findByIdAndUpdate(about._id, req.body, {
                new: true,
                runValidators: true,
            });
        } else {
            // Create new
            about = await About.create(req.body);
        }

        res.status(200).json({
            success: true,
            data: about,
        });
    } catch (err) {
        next(err);
    }
};
