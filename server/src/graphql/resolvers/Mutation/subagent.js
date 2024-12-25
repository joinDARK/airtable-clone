const { validateInput, schemas } = require("../../../utils/validation");
const { subagentService } = require("../../../services/index.js");

module.exports = {
  createSubagent: async ({ input }) => {
    const validData = validateInput(input, schemas.createSubagent);
    return await subagentService.create(validData);
  },
  updateSubagent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateSubagent);
    return await subagentService.update(id, data);
  },
  deleteSubagent: async ({ id }) => {
    await subagentService.delete(id);
    return true;
  },
};
