const { reviewerService } = require("../../../services/index.js");

module.exports = {
  reviewers: async () => {
    const result = await reviewerService.getAll();
    return result || [];
  },
  reviewer: async ({ id }) => {
    return await reviewerService.getById(id);
  },
};
