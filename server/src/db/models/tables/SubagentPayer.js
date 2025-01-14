const { DataTypes } = require('sequelize');
const sequelize = require('../../index');
const BaseModel = require('./BaseModel');

class SubagentPayer extends BaseModel {}

SubagentPayer.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
},
{
  sequelize,
  modelName: 'SubagentPayer',
  tableName: 'SubagentPayers',
  timestamps: false,
});

SubagentPayer.initAuditHooks();

module.exports = SubagentPayer;