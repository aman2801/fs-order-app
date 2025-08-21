const express = require('express');
const router = express.Router();
const { adminLogin } = require('../../controllers/admin/authController');

// @route   POST /api/admin/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', adminLogin);

module.exports = router;
