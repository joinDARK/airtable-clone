const { orderService } = require("../../../services/index.js");

module.exports = {
  orders: async () => {
    const result = await orderService.getAll();
    return result || [];
  },
  order: async ({ id }) => {
    return await orderService.getById(id);
  },
};
