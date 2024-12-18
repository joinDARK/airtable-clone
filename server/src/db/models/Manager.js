const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Manager = sequelize.define('Manager', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
}, { timestamps: false });

module.exports = Manager;