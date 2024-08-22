// routes/salesRoutes.js
const express = require('express');
const { addSale } = require('../services/salesService'); // Ensure correct path
const Sale = require('../models/Sale'); // Ensure correct path

const router = express.Router();

// Add Sale
router.post('/', async (req, res) => {
  try {
    const newSale = req.body;
    await addSale(newSale);
    res.status(201).json({ message: 'Sale added successfully' });
  } catch (error) {
    console.error('Error saving sale:', error);
    res.status(500).json({ error: 'Failed to save sale' });
  }
});

// Get Sales
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const query = date ? { timestamp: { $regex: date } } : {};
    const sales = await Sale.find(query);
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

module.exports = router;
