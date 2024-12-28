const BaseService = require('./baseService');
const { Contragent, Order } = require('../db/models');

class ContragentService extends BaseService {
  constructor() {
    super(Contragent, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new ContragentService();
