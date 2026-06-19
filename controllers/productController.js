const Product = require('../models/Product');

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
   const { name, description, price, originalPrice, image, category, stock } = req.body;
const product = await Product.create({ name, description, price, originalPrice, image, category, stock });
    res.status(201).json({ message: 'Product created!', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};