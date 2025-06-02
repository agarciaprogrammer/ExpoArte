const doorSaleService = require('../services/doorSaleService');

async function getAll(req, res) {
  try {
    const data = await doorSaleService.getAllDoorSales();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    console.log('Datos recibidos:', req.body);
    const newSale = await doorSaleService.createDoorSale(req.body);
    res.status(201).json(newSale);
  } catch (err) {
    console.error(error);
    return res.status(400).json({ error: error.message, details: error.errors });
  }
}

async function update(req, res) {
  try {
    const updated = await doorSaleService.updateDoorSale(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await doorSaleService.deleteDoorSale(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getAll, create, update, remove };
