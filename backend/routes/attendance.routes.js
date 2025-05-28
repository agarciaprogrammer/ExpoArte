const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/register', attendanceController.registerAttendance);
router.get('/:preorderId', attendanceController.getAttendanceByPreorder);

module.exports = router;