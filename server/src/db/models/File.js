const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const BaseModel = require('./BaseModel');

class File extends BaseModel {}

File.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fileName: { type: DataTypes.TEXT, allowNull: false },
    fileUrl: { type: DataTypes.TEXT, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'Files',
    timestamps: false,
  }
);

File.initAuditHooks();

module.exports = File;
