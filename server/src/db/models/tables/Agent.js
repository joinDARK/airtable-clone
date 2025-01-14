const { DataTypes } = require("sequelize");
const sequelize = require("../../index");
const BaseModel = require("./BaseModel");

class Agent extends BaseModel {}

Agent.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Agent",
    tableName: "Agents",
    timestamps: false,
  }
);

Agent.initAuditHooks();

module.exports = Agent;
