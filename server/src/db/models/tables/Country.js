const BaseModel = require('./BaseModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../../index');

class Country extends BaseModel {}

Country.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: true },
  full_name: { type: DataTypes.STRING, allowNull: true },
},
{
  sequelize,
  modelName: 'Country',
  tableName: 'Countries',
  timestamps: false,
});

Country.initAuditHooks();

module.exports = Country;