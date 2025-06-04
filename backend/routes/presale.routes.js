// src/routes/presale.routes.js
const express = require('express');
const router = express.Router();
const presaleController = require('../controllers/preorderController');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

router.use(authMiddleware);

router.post('/', roleMiddleware(['admin']), presaleController.createPreorder);
router.get('/', roleMiddleware(['admin', 'door']), presaleController.getAllPreorders);
router.put('/:id', roleMiddleware(['admin', 'door']), presaleController.updatePreorder);
router.delete('/:id', roleMiddleware(['admin']), presaleController.deletePreorder);
router.put('/:id/attendance', roleMiddleware(['admin', 'door']), presaleController.updateCheckedInCount);

module.exports = router;