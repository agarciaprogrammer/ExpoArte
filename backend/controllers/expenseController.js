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
    console.log("Obteniendo gastos...");
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    console.error("Error al obtener gastos:", error);
    res.status(500).json({ error: "Error al obtener gastos" });
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

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await expenseService.updateExpense(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await expenseService.deleteExpense(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createExpense, 
  getAllExpenses, 
  getTotalExpensesByUser,
  updateExpense,
  deleteExpense,
};