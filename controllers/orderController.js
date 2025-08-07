const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Place new order
// @route   POST /api/orders
// @access  Private
exports.placeOrder = async (req, res) => {
  const { products } = req.body;

  // Validate products is an array
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ msg: 'Products must be an array' });
  }

  try {
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      console.log(`Processing product: ${item.product}, quantity: ${item.quantity}`);
      if (!product) {
        return res.status(404).json({ msg: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: `Insufficient stock for product: ${product.name}` });
      }
      orderProducts.push({ product: item.product, quantity: item.quantity });
    }

    const newOrder = new Order({
      user: req.user.id,
      products: orderProducts,
      ipAddress: req.ip, // Get client IP address
      status: 'pending',
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get user's order history
// @route   GET /api/orders
// @access  Private
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
