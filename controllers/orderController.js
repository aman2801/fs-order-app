const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

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
    let totalAmount = 0;

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
      totalAmount += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: req.user.id,
      products: orderProducts,
      ipAddress: req.ip, // Get client IP address
      status: 'pending',
    });

    let order = await newOrder.save();
    order = await order.populate('products.product');


    // Send WhatsApp notification
    // IMPORTANT: You need to install the twilio package for this to work: npm install twilio
    const accountSid = process.env.accountSid; // Add your Twilio Account SID
    const authToken = process.env.authToken; // Add your Twilio Auth Token
    const client = require('twilio')(accountSid, authToken);

    const orderDetails = order.products.map(p => `${p.quantity} x ${p.product.name}`).join('\n');

    const user = await User.findById(order.user);

    client.messages
      .create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917983793737', // Add the recipient's WhatsApp number
        contentSid: process.env.contentSid, // Add your Twilio Content SID
        contentVariables: JSON.stringify({
          1: order._id,
          2: orderDetails,
          3: user.name,
          4: user.email,
          5: user.shopName,
          6: user.mobileNumber,
        }),
      })
      .then(message => console.log(message.sid))
      .catch(err => console.error(err));

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
