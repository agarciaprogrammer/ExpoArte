// src/routes/entry.routes.js
const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entry.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), entryController.getAll);
router.post('/', roleMiddleware(['admin']), entryController.create);

module.exports = router;