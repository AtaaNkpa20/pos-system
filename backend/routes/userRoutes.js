const express = require('express');
const { getUsers, addUser, updateUser, deleteUser } = require('../services/userService');

const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;
