const BaseService = require('./baseService');
const { Subagent, Order, SubagentPayer } = require('../db/models');

class SubagentService extends BaseService {
  constructor() {
    super(Subagent, [
      { model: Order, as: 'orders' },
      { model: SubagentPayer, as: 'subagentPayers' }
    ]);
  }
}

module.exports = new SubagentService();
