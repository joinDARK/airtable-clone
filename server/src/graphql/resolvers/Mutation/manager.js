const { validateInput, schemas } = require("../../../utils/validation");
const { managerService } = require("../../../services/index.js");

module.exports = {
  createManager: async ({ input }) => {
    const validData = validateInput(input, schemas.createManager);
    return await managerService.create(validData);
  },
  updateManager: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateManager);
    return await managerService.update(id, data);
  },
  deleteManager: async ({ id }) => {
    await managerService.delete(id);
    return true;
  },
};
