const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

// Import middleware (using the files we created earlier)
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Adjust in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression Middleware
app.use(compression());

// Route Files
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes'); // Assuming you'll want this mounted too

// Mount Routers
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// Routes (Mounting placeholder)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// app.use('/api/v1/resource', resourceRoutes); // Example

// Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
