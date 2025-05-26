// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), userController.getAll);
router.get('/:id', roleMiddleware(['admin']), userController.getById);
router.post('/', roleMiddleware(['admin']), userController.create);
router.put('/:id', roleMiddleware(['admin']), userController.update);

module.exports = router;