const { orderService } = require("../../../services/index.js");
const BaseResolver = require("./baseResolver.js");

const orderResolver = new BaseResolver(orderService);
module.exports = {
  orders: orderResolver.getAll(),
  order: orderResolver.getById(),
};
