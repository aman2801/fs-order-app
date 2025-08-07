const Product = require('../models/Product');

// @desc    List products (paginated and filtered)
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * pageSize;

    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const products = await Product.find(query)
      .limit(pageSize)
      .skip(skip);

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products,
      page,
      pages: Math.ceil(totalProducts / pageSize),
      totalProducts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
