const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message: { message: "Too many login attempts. Please try again later." }
});

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, 
    message: { message: "Too many requests, please try again later." }
});

module.exports = { loginLimiter, globalLimiter };
