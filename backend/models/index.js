// models/index.js
import SequelizePkg from 'sequelize';
import sequelize from '../config/db.js';

import UserModel from './User.js';
import ExpenseModel from './Expense.js';
import PreorderModel from './Preorder.js';
import DoorSaleModel from './DoorSale.js';
import AttendanceModel from './Attendance.js';
import SettingModel from './Setting.js';

const { Sequelize } = SequelizePkg;

const User = UserModel(sequelize, Sequelize.DataTypes);
const Expense = ExpenseModel(sequelize, Sequelize.DataTypes);
const Preorder = PreorderModel(sequelize, Sequelize.DataTypes);
const DoorSale = DoorSaleModel(sequelize, Sequelize.DataTypes);
const Attendance = AttendanceModel(sequelize, Sequelize.DataTypes);
const Setting = SettingModel(sequelize, Sequelize.DataTypes);

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

export {
  sequelize,
  Sequelize,
  User,
  Expense,
  Preorder,
  DoorSale,
  Attendance,
  Setting
};
