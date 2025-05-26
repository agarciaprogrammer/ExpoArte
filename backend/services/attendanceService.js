// services/attendanceService.js
const { Attendance, Preorder, User } = require('../models');

const registerAttendance = async (data) => {
  return await Attendance.create(data);
};

const getAttendanceByPreorder = async (preorderId) => {
  return await Attendance.findAll({
    where: { PreorderId: preorderId },
    include: [User]
  });
};

module.exports = {
  registerAttendance,
  getAttendanceByPreorder
};