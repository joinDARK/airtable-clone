const BaseService = require('./baseService');
const { Agent, Order } = require('../db/entities/enteties');

class AgentService extends BaseService {
  constructor() {
    super(Agent, [
      { model: Order, as: 'orders' } // Ассоциация агентов с заявками
    ]);
  }
}

module.exports = new AgentService();
