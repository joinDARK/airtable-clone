const { validateInput, schemas } = require("../../../utils/validation");
const { countryService } = require("../../../services/index.js");

module.exports = {
  createCountry: async ({ input }) => {
    const validData = validateInput(input, schemas.createCountry);
    return await countryService.create(validData);
  },
  updateCountry: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateCountry);
    return await countryService.update(id, data);
  },
  deleteCountry: async ({ id }) => {
    await countryService.delete(id);
    return true;
  },
};
