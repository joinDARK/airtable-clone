const { validateInput, schemas } = require("../../../utils/validation");
const { orderService } = require("../../../services/index.js");

module.exports = {
  createOrder: async ({ input }) => {
    const validData = validateInput(input, schemas.createOrder);
    return await orderService.create(validData);
  },
  updateOrder: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateOrder);
    return await orderService.update(id, data);
  },
  deleteOrder: async ({ id }) => {
    await orderService.delete(id);
    return true;
  },
};
