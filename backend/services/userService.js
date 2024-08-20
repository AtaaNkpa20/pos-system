const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const addUser = async (req, res) => {
  const { username, role } = req.body;
  const newUser = new User({ username, role });
  await newUser.save();
  res.json(await User.find());
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { role } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    user.role = role;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  await User.deleteOne({ username });
  res.json(await User.find());
};

module.exports = { getUsers, addUser, updateUser, deleteUser };
