const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), settingController.getSettings);
router.put('/', roleMiddleware(['admin']), settingController.updateTicketPrice);

module.exports = router;