// models/Attendance.js
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    count: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  });

  Attendance.associate = models => {
    Attendance.belongsTo(models.Preorder);
    Attendance.belongsTo(models.User);
  };

  return Attendance;
};