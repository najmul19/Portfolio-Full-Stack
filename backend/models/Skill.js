const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a skill name'],
            trim: true,
            unique: true,
        },
        category: {
            type: String,
            required: [true, 'Please add a category (e.g., Frontend, Backend, Tools)'],
            trim: true,
        },
        level: {
            type: String, // e.g., 'Expert', 'Intermediate', 'Beginner' or '80%'
            trim: true,
        },
        icon: {
            type: String, // URL or Icon class name
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Skill', skillSchema);
