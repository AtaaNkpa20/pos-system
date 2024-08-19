const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
