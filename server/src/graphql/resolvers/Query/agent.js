const { agentService } = require("../../../services/index.js");

module.exports = {
  agents: async () => {
    const result = await agentService.getAll();
    return result || [];
  },
  agent: async ({ id }) => {
    return await agentService.getById(id);
  },
};
