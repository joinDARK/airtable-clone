const BaseService = require('./baseService');
const { Order, SubagentPayer } = require('../db/models');

class SubagentPayerService extends BaseService {
  constructor() {
    super(SubagentPayer, [
      { model: Order, as: 'orders'},
    ]);
  }
}

module.exports = new SubagentPayerService();
