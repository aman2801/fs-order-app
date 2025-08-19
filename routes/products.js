const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProducts } = require('../controllers/productController');
const adminAuth = require('../middleware/adminMiddleware');
const { getAllProducts } = require('../controllers/admin/productController');

// @route   GET /api/products
// @desc    List products (auth required)
// @access  Private
router.get('/', auth, getProducts);
router.get('/all', auth, getAllProducts);

module.exports = router;
