// services/preorderService.js
const { Preorder, User, Attendance } = require('../models');

const createPreorder = async (data) => {
  return await Preorder.create(data);
};

const getAllPreorders = async () => {
  return await Preorder.findAll();
}

const updateCheckedInCount = async (preorderId, newCount) => {
  const preorder = await Preorder.findByPk(preorderId);
  if (!preorder) throw new Error('Preorder not found');
  preorder.checkedInCount = newCount;
  return await preorder.save();
};

const getPreorderById = async (id) => {
  return await Preorder.findByPk(id);
};

const updatePreorder = async (id, data) => {
  const preorder = await Preorder.findByPk(id);
  if (!preorder) throw new Error('Preorder not found');
  return await preorder.update(data);
};

const deletePreorder = async (id) => {
  const preorder = await Preorder.findByPk(id);
  if (!preorder) throw new Error('Preorder not found');
  return await preorder.destroy();
}

module.exports = {
  createPreorder,
  getAllPreorders,
  updateCheckedInCount,
  getPreorderById,
  updatePreorder,
  deletePreorder
};