const settingService = require('../services/settingService');
const { User } = require('../models'); // para el cambio de contraseña
const bcrypt = require('bcrypt');
const pdfService = require('../services/pdfService'); // lo creamos más abajo

const getSettings = async (req, res) => {
  try {
    const setting = await settingService.getSettings();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTicketPrices = async (req, res) => {
  try {
    const { ticketPrice, doorSalePrice } = req.body;
    const updated = await settingService.updateTicketPrices(ticketPrice, doorSalePrice);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const changePassword = async (req, res) => {
  try {
    console.log('Cambiando contraseña del usuario...');
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downloadReport = async (req, res) => {
  try {
    console.log('Descargando reporte de evento...');
    const pdfBuffer = await pdfService.generateEventReport(); // función personalizada
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte_evento.pdf');
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSettings,
  updateTicketPrices,
  changePassword,
  downloadReport
};
