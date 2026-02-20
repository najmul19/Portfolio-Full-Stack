const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const email = process.env.ADMIN_EMAIL || 'admin@example.com';
        const password = process.env.ADMIN_PASSWORD || 'admin123';
        const name = process.env.ADMIN_NAME || 'Admin';

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Admin user already exists');
            userExists.password = password; // Update password just in case
            userExists.name = name;
            await userExists.save();
            console.log('Admin user updated');
        } else {
            const user = await User.create({
                name,
                email,
                password,
                role: 'admin'
            });
            console.log(`Admin user created: ${user.email}`);
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
