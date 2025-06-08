// models/Setting.js
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    ticketPrice: { type: DataTypes.DECIMAL(10, 0), allowNull: false },
    doorSalePrice: { type: DataTypes.DECIMAL(10, 0), allowNull: false }, // nuevo
    eventDate: { type: DataTypes.DATEONLY, allowNull: true }
  });

  return Setting;
};
