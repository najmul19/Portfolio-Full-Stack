const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    date: {
        type: Date,
        default: Date.now
    },
    icon: {
        type: String // Optional: URL or icon class name
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
