const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;