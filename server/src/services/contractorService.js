const BaseService = require('./baseService');
const { Contractor, Order } = require('../db/models');

class ContractorService extends BaseService {
  constructor() {
    super(Contractor, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new ContractorService();
