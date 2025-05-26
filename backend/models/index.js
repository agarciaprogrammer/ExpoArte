// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Expense = require('./Expense')(sequelize, Sequelize.DataTypes);
const Preorder = require('./Preorder')(sequelize, Sequelize.DataTypes);
const DoorSale = require('./DoorSale')(sequelize, Sequelize.DataTypes);
const Attendance = require('./Attendance')(sequelize, Sequelize.DataTypes);
const Setting = require('./Setting')(sequelize, Sequelize.DataTypes);

// Asociaciones
User.associate({ Expense, Preorder, DoorSale, Attendance });

Expense.associate = function(models) {
  Expense.belongsTo(models.User, { foreignKey: 'userId' });
};

Preorder.associate = function(models) {
  Preorder.belongsTo(models.User, { foreignKey: 'userId' });
};

DoorSale.associate = function(models) {
  DoorSale.belongsTo(models.User, { foreignKey: 'userId' });
};

Attendance.associate = function(models) {
  Attendance.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = {
  sequelize,
  Sequelize,
  User,
  Expense,
  Preorder,
  DoorSale,
  Attendance,
  Setting
};
