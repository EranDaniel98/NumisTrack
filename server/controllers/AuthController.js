const User = require('../models/user');
const jws = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
    static async register(req, res) {
        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists." });
            }

            const newUser = new User({ username, email, password });
            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully.' });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user.', error });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ message: 'Login successful.', token });
        } catch (error) {
            return res.status(500).json({ message: 'Error logging in.', error });
        }
    }

}

module.exports = AuthController;
