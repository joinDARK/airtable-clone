const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Contragent = sequelize.define('Contragent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Contragent;