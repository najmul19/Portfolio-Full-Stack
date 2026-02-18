const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a publication title'],
            trim: true,
        },
        publisher: {
            type: String,
            required: [true, 'Please add a publisher'],
            trim: true,
        },
        date: {
            type: Date,
            required: [true, 'Please add a publication date'],
        },
        url: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the publication',
            ],
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

module.exports = mongoose.model('Publication', publicationSchema);
