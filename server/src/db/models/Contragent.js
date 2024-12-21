const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Contractor = sequelize.define('Contractor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Contractor;