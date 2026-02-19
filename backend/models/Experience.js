const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please add a company name'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Please add a role/title'],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Please add a start date'],
        },
        endDate: {
            type: Date,
            // Validator to ensure endDate is after startDate if it exists
            validate: {
                validator: function (value) {
                    // If endDate is not provided, it's valid (current job)
                    if (!value) return true;
                    // If startDate is not provided (which shouldn't happen due to required), skip
                    if (!this.startDate) return true;
                    return value > this.startDate;
                },
                message: 'End date must be after start date',
            },
        },
        current: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
        location: {
            type: String,
            trim: true,
        },
        technologies: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to handle 'current' flag
experienceSchema.pre('save', async function () {
    if (this.current) {
        this.endDate = undefined;
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
