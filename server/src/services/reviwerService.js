const BaseService = require('./baseService');
const { Reviewer, Order } = require('../db/models');

class ReviewerService extends BaseService {
  constructor() {
    super(Reviewer, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new ReviewerService();
