const BaseService = require('./baseService');
const { Agent, Order } = require('../db/models');

class AgentService extends BaseService {
  constructor() {
    super(Agent, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new AgentService();
