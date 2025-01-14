const { DataTypes } = require('sequelize');
const sequelize = require('../../index');
const BaseModel = require('./BaseModel');

class Manager extends BaseModel {};

Manager.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
},
{
  sequelize,
  modelName: 'Manager',
  tableName: 'Managers',
  timestamps: false,
});

Manager.initAuditHooks();

module.exports = Manager;