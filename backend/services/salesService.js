// services/salesService.js
const Sale = require('../models/Sale');

const addSale = async (newSale) => {
  const sale = new Sale({
    items: newSale.items,
    timestamp: new Date().toISOString(),
  });
  await sale.save();
};

module.exports = { addSale };
