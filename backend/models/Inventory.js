const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  size: { type: String },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);
