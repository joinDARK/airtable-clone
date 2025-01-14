const BaseModel = require('./BaseModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../../index');

class Client extends BaseModel {};

Client.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  inn: { type: DataTypes.STRING, allowNull: true },
},
{
  sequelize,
  modelName: 'Client',
  tableName: 'Clients',
  timestamps: false,
});

Client.initAuditHooks();

module.exports = Client;