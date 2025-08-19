const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminMiddleware');
const { getAllOrders } = require('../../controllers/admin/orderController');

// @route   GET /api/admin/orders/all
// @desc    Get all orders for admin
// @access  Private (Admin)
router.get('/', adminAuth, getAllOrders);

module.exports = router;
