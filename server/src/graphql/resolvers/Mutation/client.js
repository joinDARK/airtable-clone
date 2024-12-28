const { validateInput, schemas } = require("../../../utils/validation");
const { clientService } = require("../../../services/index.js");

module.exports = {
  createClient: async ({ input }) => {
    const validData = validateInput(input, schemas.createClient);
    return await clientService.create(validData);
  },
  updateClient: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateClient);
    return await clientService.update(id, data);
  },
  deleteClient: async ({ id }) => {
    await clientService.delete(id);
    return true;
  },
};
