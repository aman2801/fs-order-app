const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { placeOrder, getOrderHistory } = require('../controllers/orderController');
const adminAuth = require('../middleware/adminMiddleware');
const { getAllOrders } = require('../controllers/admin/orderController');

// @route   POST /api/orders
// @desc    Place new order
// @access  Private
router.post('/', auth, placeOrder);

// @route   GET /api/orders
// @desc    Get user's order history
// @access  Private
router.get('/', auth, getOrderHistory);
router.get('/all', adminAuth, getAllOrders);

module.exports = router;
