const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
exports.getCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find().sort({ issueDate: -1 });

        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public
exports.getCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: certificate,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Private (Admin only)
exports.createCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.create(req.body);

        res.status(201).json({
            success: true,
            data: certificate,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin only)
exports.updateCertificate = async (req, res, next) => {
    try {
        let certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }

        certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: certificate,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin only)
exports.deleteCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }

        await certificate.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                success: false,
                error: `Certificate not found with id of ${req.params.id}`,
            });
        }
        next(err);
    }
};
