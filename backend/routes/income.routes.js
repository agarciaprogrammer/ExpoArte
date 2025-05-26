// src/routes/income.routes.js
const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.get('/', incomeController.getAll);
router.post('/', roleMiddleware(['admin', 'door']), incomeController.create);

module.exports = router;