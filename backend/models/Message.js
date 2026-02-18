const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add your email'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        subject: {
            type: String,
            required: [true, 'Please add a subject'],
            trim: true,
            maxlength: [100, 'Subject can not be more than 100 characters'],
        },
        message: {
            type: String,
            required: [true, 'Please add a message'],
            maxlength: [1000, 'Message can not be more than 1000 characters'],
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Message', messageSchema);
