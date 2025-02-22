const BaseService = require('./baseService');
const { SubagentPayer, Order, Subagent } = require('../db/models');

class SubagentPayerService extends BaseService {
  constructor() {
    super(SubagentPayer, [
      { model: Order, as: 'orders'},
      { model: Subagent, as: 'subagents' }
    ]);
  }
}

module.exports = new SubagentPayerService();
