const { Sequelize } = require('sequelize');
const { DB } = require('../config/app.config');

const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
