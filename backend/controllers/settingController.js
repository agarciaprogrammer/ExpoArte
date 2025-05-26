// controllers/settingController.js
const settingService = require('../services/settingService');

const getSettings = async (req, res) => {
  try {
    const settings = await settingService.getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTicketPrice = async (req, res) => {
  try {
    const updated = await settingService.updateTicketPrice(req.body.ticketPrice);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSettings, updateTicketPrice };