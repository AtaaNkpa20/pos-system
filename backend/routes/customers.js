const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update a customer
router.post('/', async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    let customer = await Customer.findOne({ id });
    
    if (customer) {
      customer = await Customer.findByIdAndUpdate(customer._id, { name, email, phone }, { new: true });
    } else {
      customer = new Customer({ id, name, email, phone });
      await customer.save();
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const customer = await Customer.findOneAndUpdate({ id }, { name, email, phone }, { new: true });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findOneAndDelete({ id });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
