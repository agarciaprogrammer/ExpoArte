// services/preorderService.js
const { Preorder, User, Attendance } = require('../models');

const createPreorder = async (data) => {
  return await Preorder.create(data);
};

const getAllPreorders = async (page = 1, pageSize = 10, filters = {}) => {
  const offset = (page - 1) * pageSize;
  
  return await Preorder.findAndCountAll({
    where: filters,
    limit: pageSize,
    offset: offset,
    include: [User, Attendance]
  });
};

const updateCheckedInCount = async (preorderId, newCount) => {
  const preorder = await Preorder.findByPk(preorderId);
  if (!preorder) throw new Error('Preorder not found');
  preorder.checkedInCount = newCount;
  return await preorder.save();
};

module.exports = {
  createPreorder,
  getAllPreorders,
  updateCheckedInCount
};