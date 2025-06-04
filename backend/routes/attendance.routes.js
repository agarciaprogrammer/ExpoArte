const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

router.use(authMiddleware);

router.post('/register', roleMiddleware(['door', 'admin']), attendanceController.registerAttendance);
router.get('/:preorderId', roleMiddleware(['door', 'admin']), attendanceController.getAttendanceByPreorder);

module.exports = router;