const { validateInput, schemas } = require("../../../utils/validation");
const { contractorService } = require("../../../services/index.js");

module.exports = {
  createContragent: async ({ input }) => {
    const validData = validateInput(input, schemas.createContragent);
    return await contractorService.create(validData);
  },
  updateContragent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateContragent);
    return await contractorService.update(id, data);
  },
  deleteContragent: async ({ id }) => {
    await contractorService.delete(id);
    return true;
  },
};
