const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
    {
        institution: {
            type: String,
            required: [true, 'Please add an institution/school name'],
            trim: true,
        },
        degree: {
            type: String,
            required: [true, 'Please add a degree'],
            trim: true,
        },
        fieldOfStudy: {
            type: String,
            required: [true, 'Please add a field of study'],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Please add a start date'],
        },
        endDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    if (!value) return true;
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
        grade: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to handle 'current' flag
educationSchema.pre('save', function (next) {
    if (this.current) {
        this.endDate = undefined;
    }
    next();
});

module.exports = mongoose.model('Education', educationSchema);
