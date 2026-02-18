const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add your name'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Please add your title/role'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description/bio'],
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        phone: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the avatar',
            ],
        },
        resume: {
            type: String,
            match: [
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                'Please use a valid URL for the resume',
            ],
        },
        social: {
            github: String,
            linkedin: String,
            twitter: String,
            instagram: String,
            facebook: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('About', aboutSchema);
