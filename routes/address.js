const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// SAVE/UPDATE ADDRESS (keeps only the latest one for simplicity)
router.post('/', async (req, res) => {
  try {
    await Address.deleteMany({});
    const address = await Address.create(req.body);
    res.status(201).json({ message: 'Address saved!', address });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET SAVED ADDRESS
router.get('/', async (req, res) => {
  try {
    const address = await Address.findOne().sort({ createdAt: -1 });
    res.json(address || null);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;