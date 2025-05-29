// controllers/preorderController.js
const preorderService = require('../services/preorderService');

const createPreorder = async (req, res) => {
  try {
    const preorder = await preorderService.createPreorder(req.body);
    res.status(201).json(preorder);
  } catch (error) {
    console.error('Error en createPreorder:', error);
    res.status(500).json({ error: 'Error al obtener preventas' });
  }
};

const getAllPreorders = async (req, res) => {
  console.log("GET /api/preorders");
  try {
    const preorders = await preorderService.getAllPreorders();
    res.status(200).json(preorders);
  } catch (error) {
    console.error('Error en getAllPreorders:', error);
    res.status(500).json({ error: 'Error al obtener preventas' });
  }

};

const updateCheckedInCount = async (req, res) => {
  try {
    const updated = await preorderService.updateCheckedInCount(req.params.id, req.body.checkedInCount);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePreorder = async (req, res) => {
  try {
    const updated = await preorderService.updatePreorder(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePreorder = async (req, res) => {
  try {
    await preorderService.deletePreorder(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPreorder, getAllPreorders, updateCheckedInCount, updatePreorder, deletePreorder };