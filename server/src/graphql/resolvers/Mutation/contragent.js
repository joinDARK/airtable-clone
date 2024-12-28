const { validateInput, schemas } = require("../../../utils/validation");
const { contragentService } = require("../../../services/index.js");

module.exports = {
  createContragent: async ({ input }) => {
    const validData = validateInput(input, schemas.createContragent);
    return await contragentService.create(validData);
  },
  updateContragent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateContragent);
    return await contragentService.update(id, data);
  },
  deleteContragent: async ({ id }) => {
    await contragentService.delete(id);
    return true;
  },
};
