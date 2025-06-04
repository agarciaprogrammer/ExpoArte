// src/routes/income.routes.js
const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'door']), incomeController.getAll);
router.post('/', roleMiddleware(['admin', 'door']), incomeController.create);

module.exports = router;