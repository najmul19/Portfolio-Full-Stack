const express = require('express');
const {
    getCertificates,
    getCertificate,
    createCertificate,
    updateCertificate,
    deleteCertificate,
} = require('../controllers/certificateController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getCertificates)
    .post(protect, authorize('admin'), createCertificate);

router
    .route('/:id')
    .get(getCertificate)
    .put(protect, authorize('admin'), updateCertificate)
    .delete(protect, authorize('admin'), deleteCertificate);

module.exports = router;
