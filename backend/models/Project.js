const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a project title'],
            trim: true,
            maxlength: [100, 'Title can not be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [1000, 'Description can not be more than 1000 characters'],
        },
        techStack: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: 'A project must have at least one technology listed',
            },
        },
        thumbnail: {
            type: String,
            required: [true, 'Please add a thumbnail URL'],
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the thumbnail',
            ],
        },
        githubLink: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for GitHub',
            ],
        },
        youtubeLink: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for YouTube',
            ],
        },
        liveLink: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the live link',
            ],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
