const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} = require('../controllers/productController');

router.delete('/deleteall', async (req, res) => {
  try {
    await require('../models/Product').deleteMany({});
    res.json({ message: 'All products deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting', error });
  }
});

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;