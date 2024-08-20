const express = require('express');
const { getInventory, addOrUpdateInventory, deleteInventory } = require('../services/inventoryService');

const router = express.Router();

router.get('/', getInventory);
router.post('/', addOrUpdateInventory);
router.delete('/:name', deleteInventory);

module.exports = router;
