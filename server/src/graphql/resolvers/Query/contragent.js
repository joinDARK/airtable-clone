const { contractorService } = require("../../../services/index.js");

module.exports = {
  contragents: async () => {
    const result = await contractorService.getAll();
    return result || [];
  },
  contragent: async ({ id }) => {
    return await contractorService.getById(id);
  },
};
