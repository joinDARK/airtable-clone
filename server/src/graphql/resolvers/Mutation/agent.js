const { validateInput, schemas } = require("../../../utils/validation");
const { agentService } = require("../../../services/index.js");

module.exports = {
  createAgent: async ({ input }) => {
    const validData = validateInput(input, schemas.createAgent);
    return await agentService.create(validData);
  },
  updateAgent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateAgent);
    return await agentService.update(id, data);
  },
  deleteAgent: async ({ id }) => {
    await agentService.delete(id);
    return true;
  },
};
