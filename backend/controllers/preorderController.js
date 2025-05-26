// controllers/preorderController.js
const preorderService = require('../services/preorderService');

const createPreorder = async (req, res) => {
  try {
    const preorder = await preorderService.createPreorder(req.body);
    res.status(201).json(preorder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPreorders = async (req, res) => {
  try {
    const preorders = await preorderService.getAllPreorders();
    res.json(preorders);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

module.exports = { createPreorder, getAllPreorders, updateCheckedInCount };