const BaseService = require('./baseService');
const { Subagent, Order, SubagentPayer } = require('../db/entities/enteties');

class SubagentService extends BaseService {
  constructor() {
    super(Subagent, [
      { model: Order, as: 'orders' },
      { model: SubagentPayer, as: 'subagentPayers' }
    ]);
  }
}

module.exports = new SubagentService();
