// models/User.js
const { validate } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'door'), allowNull: false }
  });

  User.associate = models => {
    User.hasMany(models.Preorder);
    User.hasMany(models.Expense);
    User.hasMany(models.DoorSale);
    User.hasMany(models.Attendance);
  };

  return User;
};