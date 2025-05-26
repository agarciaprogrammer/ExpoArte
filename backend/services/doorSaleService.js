// services/doorSaleService.js
const { DoorSale, User } = require('../models');

const createDoorSale = async (data) => {
  return await DoorSale.create(data);
};

const getAllDoorSales = async () => {
  return await DoorSale.findAll({ include: User });
};

module.exports = {
  createDoorSale,
  getAllDoorSales
};