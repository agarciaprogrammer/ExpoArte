// src/routes/presale.routes.js
const express = require('express');
const router = express.Router();
const presaleController = require('../controllers/presale.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'door']), presaleController.getAll);
router.post('/', roleMiddleware(['admin']), presaleController.create);
router.put('/:id/attendance', roleMiddleware(['door']), presaleController.updateAttendance);

module.exports = router;