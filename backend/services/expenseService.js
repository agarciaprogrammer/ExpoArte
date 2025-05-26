// services/expenseService.js
const { Expense, User } = require('../models');

const createExpense = async (data) => {
  return await Expense.create(data);
};

const getAllExpenses = async () => {
  return await Expense.findAll({ include: User });
};

const getTotalExpensesByUser = async () => {
  const expenses = await Expense.findAll({ include: User });
  return expenses.reduce((acc, exp) => {
    acc[exp.User.name] = (acc[exp.User.name] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});
};

module.exports = {
  createExpense,
  getAllExpenses,
  getTotalExpensesByUser
};