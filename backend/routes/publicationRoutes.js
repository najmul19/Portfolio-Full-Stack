const express = require('express');
const {
    getPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication,
} = require('../controllers/publicationController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getPublications)
    .post(protect, authorize('admin'), createPublication);

router
    .route('/:id')
    .get(getPublication)
    .put(protect, authorize('admin'), updatePublication)
    .delete(protect, authorize('admin'), deletePublication);

module.exports = router;
