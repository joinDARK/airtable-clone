const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const SubagentPayer = sequelize.define('SubagentPayer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = SubagentPayer;