// src/routes/expense.routes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), expenseController.getAllExpenses);
router.post('/', roleMiddleware(['admin']), expenseController.createExpense);
router.get('/total', roleMiddleware(['admin']), expenseController.getTotalExpensesByUser);
router.put('/:id', roleMiddleware(['admin']), expenseController.updateExpense);
router.delete('/:id', roleMiddleware(['admin']), expenseController.deleteExpense);

module.exports = router;