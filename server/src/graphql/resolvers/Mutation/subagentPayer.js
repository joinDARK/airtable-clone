const { validateInput, schemas } = require("../../../utils/validation");
const { subagentPayerService } = require("../../../services/index.js");

module.exports = {
  createSubagentPayer: async ({ input }) => {
    const validData = validateInput(input, schemas.createSubagentPayer);
    return await subagentPayerService.create(validData);
  },
  updateSubagentPayer: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateSubagentPayer);
    return await subagentPayerService.update(id, data);
  },
  deleteSubagentPayer: async ({ id }) => {
    await subagentPayerService.delete(id);
    return true;
  },
};
