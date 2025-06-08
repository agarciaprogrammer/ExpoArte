const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/', settingController.getSettings);
router.put('/', roleMiddleware(['admin']), settingController.updateTicketPrices);
router.put('/change-password', roleMiddleware(['admin']), settingController.changePassword);
router.get('/report', roleMiddleware(['admin']), settingController.downloadReport);

module.exports = router;