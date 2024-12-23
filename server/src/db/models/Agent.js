const { DataTypes } = require('sequelize');
const sequelize = require('../index'); // путь к вашему файлу с инициализацией sequelize

const Agent = sequelize.define('Agent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Agent;