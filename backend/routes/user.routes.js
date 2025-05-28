// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), userController.getAllUsers);
router.get('/:id', roleMiddleware(['admin']), userController.getUserById);
router.get('/:email', roleMiddleware(['admin']), userController.getUserByEmail);
router.post('/', roleMiddleware(['admin']), userController.createUser);
//router.put('/:id', roleMiddleware(['admin']), userController.update);

module.exports = router;