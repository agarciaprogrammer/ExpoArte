// services/settingService.js
const { Setting } = require('../models');

const getSettings = async () => {
  return await Setting.findAll();
};

const updateTicketPrice = async (newPrice) => {
  const setting = await Setting.findOne();
  if (!setting) throw new Error('Settings not found');
  setting.ticketPrice = newPrice;
  return await setting.save();
};

module.exports = {
  getSettings,
  updateTicketPrice
};