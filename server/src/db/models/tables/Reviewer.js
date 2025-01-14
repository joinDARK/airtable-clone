const { DataTypes } = require('sequelize');
const sequelize = require('../../index');
const BaseModel = require('./BaseModel');

class Reviewer extends BaseModel {}

Reviewer.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
},
{
  sequelize,
  modelName: 'Reviewer',
  tableName: 'Reviewers',
  timestamps: false,
});

Reviewer.initAuditHooks();

module.exports = Reviewer;