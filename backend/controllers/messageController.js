const Message = require('../models/Message');

// @desc    Store new message (Public Contact Form)
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res, next) => {
    try {
        const message = await Message.create(req.body);

        // Send email notification to admin (or the user, depending on requirement. Usually admin wants to know)
        // For this portfolio, we likely want to notify the Admin (YOU) that someone contacted you.
        try {
            const sendEmail = require('../utils/sendEmail');

            // Notify Admin
            await sendEmail({
                email: process.env.FROM_EMAIL, // Or your personal email
                subject: `New Contact Form Submission: ${req.body.subject}`,
                message: `You have received a new message from ${req.body.name} (${req.body.email}).\n\nMessage:\n${req.body.message}`,
            });

        } catch (err) {
            console.error('Email could not be sent', err);
            // We don't want to fail the request if email fails, just log it
        }

        res.status(201).json({
            success: true,
            data: message,
            message: 'Message sent successfully',
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin only)
exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Mark message as read/unread
// @route   PUT /api/messages/:id
// @access  Private (Admin only)
exports.updateMessageStatus = async (req, res, next) => {
    try {
        let message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                error: `Message not found with id of ${req.params.id}`,
            });
        }

        // Toggle read status or set explicit value if provided
        const read = req.body.read !== undefined ? req.body.read : !message.read;

        message = await Message.findByIdAndUpdate(
            req.params.id,
            { read },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: message,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin only)
exports.deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                error: `Message not found with id of ${req.params.id}`,
            });
        }

        await message.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
