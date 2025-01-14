const { DataTypes } = require('sequelize');
const sequelize = require('../../index');
const BaseModel = require('./BaseModel');

class Subagent extends BaseModel {}

Subagent.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
},
{
  sequelize,
  modelName: 'Subagent',
  tableName: 'Subagents',
  timestamps: false,
});

Subagent.initAuditHooks();

module.exports = Subagent;