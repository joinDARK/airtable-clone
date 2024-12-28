const { subagentService } = require("../../../services/index.js");

module.exports = {
  subagents: async () => {
    const result = await subagentService.getAll();
    return result || [];
  },
  subagent: async ({ id }) => {
    return await subagentService.getById(id);
  },
};
