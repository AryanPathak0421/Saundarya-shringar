const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined; // Remove password from output

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// Customer Auth: Send OTP (Mock)
exports.sendOtp = async (req, res, next) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ status: 'error', message: 'Phone number required.' });

        // In a real app, send OTP via SMS here.
        console.log(`\x1b[33m%s\x1b[0m`, `★ OTP Sent to ${phone}: 123456 (MOCK)`);

        res.status(200).json({ status: 'success', message: 'OTP sent to mobile number.' });
    } catch (err) {
        next(err);
    }
};

// Customer Auth: Verify OTP
exports.verifyOtp = async (req, res, next) => {
    try {
        const { phone, otp, name } = req.body;
        if (!phone || !otp) return res.status(400).json({ status: 'error', message: 'Phone and OTP required.' });

        if (otp !== '123456') return res.status(401).json({ status: 'error', message: 'Invalid OTP.' });

        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ name: name || 'Valued Customer', phone, role: 'customer' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Admin/General Auth: Register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'customer' // Defaults to customer unless specified
        });

        createSendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// Admin Auth: Login
exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ status: 'error', message: 'Email and password required.' });

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
        }

        if (user.role !== 'admin' && user.role !== 'super-admin') {
            return res.status(403).json({ status: 'error', message: 'Unauthorized access.' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Get User Profile
exports.getMe = async (req, res, next) => {
    res.status(200).json({ status: 'success', data: { user: req.user } });
};
