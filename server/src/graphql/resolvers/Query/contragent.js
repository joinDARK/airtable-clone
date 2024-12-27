const { contragentService } = require("../../../services/index.js");

module.exports = {
  contragents: async () => {
    const result = await contragentService.getAll();
    return result || [];
  },
  contragent: async ({ id }) => {
    return await contragentService.getById(id);
  },
};
