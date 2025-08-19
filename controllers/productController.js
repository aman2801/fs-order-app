const Product = require('../models/Product');

// @desc    List products (paginated and filtered)
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
