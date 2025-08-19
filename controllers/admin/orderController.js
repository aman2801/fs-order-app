const Order = require('../../models/Order');

// @desc    Get all orders for admin
// @route   GET /api/admin/orders/all
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
