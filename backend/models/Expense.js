// models/Expense.js
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    description: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Iara', 'Kate']],
      },
    },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  });

  Expense.associate = models => {
    Expense.belongsTo(models.User);
  };

  return Expense;
};