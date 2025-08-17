const Product = require('../models/Product');

// @desc    List products (paginated and filtered)
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const products = await Product.find(query);

    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
