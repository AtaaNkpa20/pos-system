const express = require('express');
const router = express.Router();

// Dummy sales data
const sales = [
  { timestamp: '2024-08-15', items: [{ name: 'Medicine A', size: '500ml', quantity: 2, price: 20 }] },
  { timestamp: '2024-08-16', items: [{ name: 'Medicine B', size: '200ml', quantity: 1, price: 15 }] },
];

router.get('/', (req, res) => {
  const { date } = req.query;
  if (date) {
    const filteredSales = sales.filter(sale => sale.timestamp === date);
    res.json(filteredSales);
  } else {
    res.json(sales);
  }
});

module.exports = router;
