const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminMiddleware');
const { getAllProducts } = require('../../controllers/admin/productController');

// @route   GET /api/admin/products/all
// @desc    Get all products for admin
// @access  Private (Admin)
router.get('/', adminAuth, getAllProducts);

module.exports = router;
