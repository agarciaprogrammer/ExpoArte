// src/routes/presale.routes.js
const express = require('express');
const router = express.Router();
const presaleController = require('../controllers/preorderController');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'door']), presaleController.getAll);
router.post('/', roleMiddleware(['admin']), presaleController.create);
router.put('/:id/attendance', roleMiddleware(['door']), presaleController.updateAttendance);

module.exports = router;