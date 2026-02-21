require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().catch(err => {
    console.error('Initial DB connection error:', err);
});

// For Vercel, we export the app. Vercel will handle the "listening".
module.exports = app;

// Local Development: only listen if running this file directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    });
}
