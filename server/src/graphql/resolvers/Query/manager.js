const { managerService } = require("../../../services/index.js");

module.exports = {
  managers: async () => {
    const result = await managerService.getAll();
    return result || [];
  },
  manager: async ({ id }) => {
    return await managerService.getById(id);
  },
};
