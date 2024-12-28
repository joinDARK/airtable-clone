const BaseService = require('./baseService');
const {
  Order,
  Manager,
  Reviewer,
  Contragent,
  Agent,
  Client,
  Subagent,
  Country,
  SubagentPayer,
  File
} = require('../db/models');

class OrderService extends BaseService {
  constructor() {
    super(Order, [
      { model: Manager, as: 'managers' },
      { model: Manager, as: 'reviewers' },
      { model: Contragent, as: 'contragents' },
      { model: Agent, as: 'agents' },
      { model: Client, as: 'clients' },
      { model: Country, as: 'countries' },
      { model: Subagent, as: 'subagents' },
      { model: SubagentPayer, as: 'subagentPayers' },
      { model: File, as: 'files' },
    ]);
  }
}

module.exports = new OrderService();