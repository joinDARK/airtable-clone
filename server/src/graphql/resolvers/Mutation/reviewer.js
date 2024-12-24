const { validateInput, schemas } = require("../../../utils/validation");
const { reviewerService } = require("../../../services/index.js");
module.exports = {
  createReviewer: async ({ input }) => {
    const validData = validateInput(input, schemas.createManager);
    return await reviewerService.create(validData);
  },
  updateReviewer: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateManager);
    return await reviewerService.update(id, data);
  },
  deleteReviewer: async ({ id }) => {
    await reviewerService.delete(id);
    return true;
  },
};
