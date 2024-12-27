const { subagentPayerService } = require("../../../services/index.js");

module.exports = {
  subagentsPayers: async () => {
    const result = await subagentPayerService.getAll();
    return result || [];
  },
  subagentPayer: async ({ id }) => {
    return await subagentPayerService.getById(id);
  },
};
