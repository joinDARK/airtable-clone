const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: true },
  full_name: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false });

module.exports = Country;