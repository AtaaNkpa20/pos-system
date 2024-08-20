const Customer = require('../models/Customer');

const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

const addOrUpdateCustomer = async (req, res) => {
  const { id, name, email, phone } = req.body;
  const existingCustomer = await Customer.findOne({ id });

  if (existingCustomer) {
    existingCustomer.name = name;
    existingCustomer.email = email;
    existingCustomer.phone = phone;
    await existingCustomer.save();
  } else {
    const newCustomer = new Customer({ id, name, email, phone });
    await newCustomer.save();
  }

  res.json(await Customer.find());
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  await Customer.deleteOne({ id });
  res.json(await Customer.find());
};

module.exports = { getCustomers, addOrUpdateCustomer, deleteCustomer };
