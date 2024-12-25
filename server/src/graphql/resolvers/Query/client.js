const { clientService } = require("../../../services/index.js");

module.exports = {
  clients: async () => {
    const result = await clientService.getAll();
    return result || [];
  },
  client: async ({ id }) => {
    return await clientService.getById(id);
  },
};
