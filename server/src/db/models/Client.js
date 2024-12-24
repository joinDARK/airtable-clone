const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Client = sequelize.define('Client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  inn: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false });

module.exports = Client;