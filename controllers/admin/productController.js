const Product = require('../../models/Product');

// @desc    Get all products for admin
// @route   GET /api/admin/products/all
// @access  Private (Admin)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
