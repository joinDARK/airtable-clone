const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const File = sequelize.define('File', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileName: { type: DataTypes.TEXT, allowNull: false },
  fileUrl: { type: DataTypes.TEXT, allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = File;