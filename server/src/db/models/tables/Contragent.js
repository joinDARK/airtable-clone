const BaseModel = require('./BaseModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../../index');

class Contragent extends BaseModel {}

Contragent.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
},
{
  sequelize,
  modelName: 'Contragent',
  tableName: 'Contragents',
  timestamps: false,
});

Contragent.initAuditHooks();

module.exports = Contragent;