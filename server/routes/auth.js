const express = require('express');
const AuthController = require('../controllers/AuthController');
const { loginLimiter } = require('../middleware/rateLimiter');
const { validateAuth } = require('../validation/authValidation');

const router = express.Router();

router.post('/register', validateAuth, AuthController.register);
router.post('/login', loginLimiter, validateAuth, AuthController.login);

module.exports = router;