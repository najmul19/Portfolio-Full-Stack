const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a certificate name'],
            trim: true,
        },
        issuingOrganization: {
            type: String,
            required: [true, 'Please add an issuing organization'],
            trim: true,
        },
        issueDate: {
            type: Date,
            required: [true, 'Please add an issue date'],
        },
        credentialUrl: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the credential',
            ],
        },
        credentialId: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
        fileUrl: {
            type: String,
            default: null,
        },
        fileType: {
            type: String,
            enum: ['image', 'pdf', null],
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Certificate', certificateSchema);
