// controllers/expenseController.js
const expenseService = require('../services/expenseService');

const createExpense = async (req, res) => {
  try {
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalExpensesByUser = async (req, res) => {
  try {
    const totals = await expenseService.getTotalExpensesByUser();
    res.json(totals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createExpense, getAllExpenses, getTotalExpensesByUser };