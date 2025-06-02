// models/DoorSale.js
module.exports = (sequelize, DataTypes) => {
  const DoorSale = sequelize.define('DoorSale', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    finalPrice: { type: DataTypes.INTEGER, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  });

  DoorSale.associate = models => {
    DoorSale.belongsTo(models.User);
  };

  return DoorSale;
};