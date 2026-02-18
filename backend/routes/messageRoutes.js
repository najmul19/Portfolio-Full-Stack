const express = require('express');
const {
    createMessage,
    getMessages,
    updateMessageStatus,
    deleteMessage,
} = require('../controllers/messageController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(createMessage) // Public
    .get(protect, authorize('admin'), getMessages); // Admin only

router.route('/:id')
    .put(protect, authorize('admin'), updateMessageStatus) // Mark as read
    .delete(protect, authorize('admin'), deleteMessage); // Delete

module.exports = router;
