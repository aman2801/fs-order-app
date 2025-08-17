const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user account
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login and get tokens
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/auth/refresh
// @desc    Get new JWT with refresh token
// @access  Public
router.post('/refresh', refreshAccessToken);



module.exports = router;
