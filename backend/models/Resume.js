const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: [true, 'Please provide a file URL']
    },
    version: {
        type: String,
        required: [true, 'Please provide a version identifier (e.g., v1.0, Software Engineer, etc.)']
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

// Ensure only one resume is active at a time
resumeSchema.pre('save', async function () {
    if (this.isActive) {
        await this.constructor.updateMany(
            { _id: { $ne: this._id } },
            { isActive: false }
        );
    }
});

module.exports = mongoose.model('Resume', resumeSchema);
