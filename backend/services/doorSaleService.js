const { DoorSale } = require('../models');

async function getAllDoorSales() {
  return await DoorSale.findAll({ order: [['date', 'DESC']] });
}

async function createDoorSale(data) {
  return await DoorSale.create(data);
}

async function updateDoorSale(id, data) {
  const sale = await DoorSale.findByPk(id);
  if (!sale) throw new Error('Venta no encontrada');
  return await sale.update(data);
}

async function deleteDoorSale(id) {
  const sale = await DoorSale.findByPk(id);
  if (!sale) throw new Error('Venta no encontrada');
  return await sale.destroy();
}

module.exports = {
  getAllDoorSales,
  createDoorSale,
  updateDoorSale,
  deleteDoorSale
};
