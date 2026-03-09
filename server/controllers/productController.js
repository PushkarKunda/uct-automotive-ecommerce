const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Basic fitment logic support: search by make, model, year
    const fitmentQuery = {};
    if (req.query.make) fitmentQuery['compatibleVehicles.make'] = req.query.make;
    if (req.query.model) fitmentQuery['compatibleVehicles.model'] = req.query.model;
    if (req.query.year) fitmentQuery['compatibleVehicles.year'] = req.query.year;

    const products = await Product.find({ ...keyword, ...fitmentQuery });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById };
