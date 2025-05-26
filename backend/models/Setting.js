// models/Setting.js
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    ticketPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    eventDate: { type: DataTypes.DATEONLY, allowNull: true }
  });

  return Setting;
};
