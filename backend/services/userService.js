// services/userService.js
const { User } = require('../models');

const createUser = async (data) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};