// src/routes/presale.routes.js
const express = require('express');
const router = express.Router();
const presaleController = require('../controllers/preorderController');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

//router.use(authMiddleware);

router.post('/', presaleController.createPreorder);
router.get('/', presaleController.getAllPreorders);
router.put('/:id', presaleController.updatePreorder);
router.delete('/:id', presaleController.deletePreorder);
router.put('/:id/attendance', presaleController.updateCheckedInCount);


/*
router.get('/', roleMiddleware(['admin', 'door']), presaleController.getAll);
router.post('/', roleMiddleware(['admin']), presaleController.create);
router.put('/:id/attendance', roleMiddleware(['door']), presaleController.updateAttendance);
router.put('/:id', roleMiddleware(['admin']), presaleController.updatePreorder);
router.delete('/:id', roleMiddleware(['admin']), presaleController.deletePreorder);
*/

module.exports = router;