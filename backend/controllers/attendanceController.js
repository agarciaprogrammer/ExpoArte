// controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');

const registerAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.registerAttendance(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAttendanceByPreorder = async (req, res) => {
  try {
    const records = await attendanceService.getAttendanceByPreorder(req.params.preorderId);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerAttendance, getAttendanceByPreorder };