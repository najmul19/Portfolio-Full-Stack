const express = require('express');
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(getProjects)
    .post(protect, authorize('admin'), createProject);

router
    .route('/:id')
    .get(getProject)
    .put(protect, authorize('admin'), updateProject)
    .delete(protect, authorize('admin'), deleteProject);

module.exports = router;
