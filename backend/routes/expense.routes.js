// src/routes/expense.routes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

//router.use(authMiddleware);

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.get('/', expenseController.getTotalExpensesByUser);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);


//router.post('/', roleMiddleware(['admin']), expenseController.createExpense);
//router.get('/', roleMiddleware(['admin']), expenseController.getTotalExpensesByUser);

module.exports = router;