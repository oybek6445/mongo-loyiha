const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controller/authController');

// @route   POST /auth/register
// @desc    Register a new user (teacher or student)
// @access  Public
router.post('/register', register);

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   POST /auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', logout);

module.exports = router;
