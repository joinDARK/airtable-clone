const { validateInput, schemas } = require("../../../utils/validation");
const { fileService } = require("../../../services/index.js");

module.exports = {
  createFile: async ({ input }) => {
    const validData = validateInput(input, schemas.createFile);
    return await fileService.create(validData);
  },
  updateFile: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateFile);
    return await fileService.update(id, data);
  },
  deleteFile: async ({ id }) => {
    await fileService.delete(id);
    return true;
  },
};
