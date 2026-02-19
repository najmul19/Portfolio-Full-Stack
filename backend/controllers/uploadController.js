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

        // Sanitize filename: remove extension, spaces, and special chars
        const sanitized = filename
            ? filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
            : undefined;

        // Detect if the file is a PDF from the data URI
        const isPdf = dataUri.startsWith('data:application/pdf');

        const url = await uploadToCloudinary(dataUri, {
            // PDFs must use 'raw' resource type, otherwise Cloudinary serves them
            // under /image/upload/ which returns 401
            resource_type: isPdf ? 'raw' : 'image',
            public_id: sanitized ? `${Date.now()}_${sanitized}` : undefined,
        });

        res.status(200).json({ success: true, url });
    } catch (err) {
        next(err);
    }
};
