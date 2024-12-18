const { Sequelize } = require("sequelize");
const { DB } = require("../config/app.config");


const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Подключение к бд успешное!"))
  .catch((err) => console.log(`Ошибка подключения к бд: ${err}`));

module.exports = sequelize;
