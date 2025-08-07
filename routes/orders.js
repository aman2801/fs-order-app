const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { placeOrder, getOrderHistory } = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Place new order
// @access  Private
router.post('/', auth, placeOrder);

// @route   GET /api/orders
// @desc    Get user's order history
// @access  Private
router.get('/', auth, getOrderHistory);

module.exports = router;
