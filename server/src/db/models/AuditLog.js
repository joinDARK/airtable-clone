const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  tableName: { type: DataTypes.STRING, allowNull: false },
  recordId: { type: DataTypes.INTEGER, allowNull: false },
  actionType: { type: DataTypes.ENUM('create', 'update', 'delete'), allowNull: false },
  changedFields: { type: DataTypes.JSONB, allowNull: true },
  previousValues: { type: DataTypes.JSONB, allowNull: true },
  newValues: { type: DataTypes.JSONB, allowNull: true },
  operationDescription: { type: DataTypes.STRING, allowNull: true },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Audit_logs',
  timestamps: false,
});

module.exports = AuditLog;