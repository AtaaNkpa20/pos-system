const express = require('express');
const { getCustomers, addOrUpdateCustomer, deleteCustomer } = require('../services/customerService');

const router = express.Router();

router.get('/', getCustomers);
router.post('/', addOrUpdateCustomer);
router.put('/:id', addOrUpdateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
