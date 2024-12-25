const { fileService } = require("../../../services/index.js");

module.exports = {
  files: async () => {
    const result = await fileService.getAll();
    return result || [];
  },
  file: async ({ id }) => {
    return await fileService.getById(id);
  },
};
