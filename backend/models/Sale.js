const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      size: String,
      quantity: Number,
      price: Number
    }
  ],
  timestamp: {
    type: String,
    default: () => new Date().toISOString()
  }
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;
