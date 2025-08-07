const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProducts } = require('../controllers/productController');

// @route   GET /api/products
// @desc    List products (auth required)
// @access  Private
router.get('/', auth, getProducts);

module.exports = router;
