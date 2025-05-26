// models/Preorder.js
module.exports = (sequelize, DataTypes) => {
  const Preorder = sequelize.define('Preorder', {
    fullName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    checkedInCount: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  Preorder.associate = models => {
    Preorder.belongsTo(models.User);
    Preorder.hasMany(models.Attendance);
  };

  return Preorder;
};