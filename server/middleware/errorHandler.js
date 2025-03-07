const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        message: err.message || 'Internal Server Error',
    };

    // Log error with metadata
    logger.error({
        method: req.method,
        url: req.originalUrl,
        status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    // Handle Joi validation errors
    if (err.isJoi) {
        return res.status(400).json({ message: err.details[0].message });
    }

    // Show stack traces only in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
});

module.exports = errorHandler;
