const Inventory = require('../models/Inventory');

const getInventory = async (req, res) => {
  const inventory = await Inventory.find();
  res.json(inventory);
};

const addOrUpdateInventory = async (req, res) => {
  const { name, price, size, stock } = req.body;
  const existingItem = await Inventory.findOne({ name });

  if (existingItem) {
    existingItem.price = price;
    existingItem.size = size;
    existingItem.stock = stock;
    await existingItem.save();
  } else {
    const newItem = new Inventory({ name, price, size, stock });
    await newItem.save();
  }

  res.json(await Inventory.find());
};

const deleteInventory = async (req, res) => {
  const { name } = req.params;
  await Inventory.deleteOne({ name });
  res.json(await Inventory.find());
};

module.exports = { getInventory, addOrUpdateInventory, deleteInventory };
