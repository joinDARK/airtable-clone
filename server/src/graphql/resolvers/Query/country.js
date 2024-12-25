const { countryService } = require("../../../services/index.js");

module.exports = {
  countries: async () => {
    const result = await countryService.getAll();
    return result || [];
  },
  country: async ({ id }) => {
    return await countryService.getById(id);
  },
};
