// controllers/doorSaleController.js
const doorSaleService = require('../services/doorSaleService');

const createDoorSale = async (req, res) => {
  try {
    const sale = await doorSaleService.createDoorSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDoorSales = async (req, res) => {
  try {
    const sales = await doorSaleService.getAllDoorSales();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createDoorSale, getAllDoorSales };