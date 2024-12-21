const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Subagent = sequelize.define('Subagent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Subagent;