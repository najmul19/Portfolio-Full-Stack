const uploadToCloudinary = require('../utils/cloudinary');

// @desc    Upload a file (PDF or image) to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin only)
exports.uploadFile = async (req, res, next) => {
    try {
        const { dataUri, filename } = req.body;

        if (!dataUri) {
            return res.status(400).json({ success: false, error: 'No file data provided' });
        }

        const url = await uploadToCloudinary(dataUri, {
            public_id: filename ? `portfolio/certificates/${Date.now()}_${filename}` : undefined,
        });

        res.status(200).json({ success: true, url });
    } catch (err) {
        next(err);
    }
};
