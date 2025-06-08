const { User, Setting } = require('../models');
const bcrypt = require('bcrypt');
const generatePDF = require('./pdfService'); // suponiendo que tengas esto

const getSettings = async () => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = await Setting.create({
      ticketPrice: 0,
      doorSalePrice: 0,
      eventDate: null,
    });
  }
  return setting;
};

const updateTicketPrices = async (ticketPrice, doorSalePrice) => {
  const setting = await Setting.findOne();
  if (!setting) throw new Error('Settings not found');
  setting.ticketPrice = ticketPrice;
  setting.doorSalePrice = doorSalePrice;
  return await setting.save();
};


const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) throw new Error('Current password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
};

const downloadReport = async () => {
  const pdfBuffer = await generatePDF(); // lo que quieras que contenga
  return pdfBuffer;
};

module.exports = {
  getSettings,
  updateTicketPrices,
  changePassword,
  downloadReport,
};
