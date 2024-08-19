const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const authenticateJWT = require('./users').authenticateJWT; // Import the authentication middleware

// Middleware to protect routes
router.use(authenticateJWT);

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update an inventory item
router.post('/', async (req, res) => {
  try {
    const { name, price, size, stock } = req.body;
    
    // Validate input data
    if (price < 0 || stock < 0) {
      return res.status(400).json({ error: 'Price and stock must be non-negative' });
    }

    let item = await Inventory.findOne({ name });

    if (item) {
      item = await Inventory.findByIdAndUpdate(item._id, { price, size, stock }, { new: true });
    } else {
      item = new Inventory({ name, price, size, stock });
      await item.save();
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an inventory item
router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Inventory.findOneAndDelete({ name });
    
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
