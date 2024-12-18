const BaseService = require('./baseService');
const { Contractor, Order } = require('../db/entities/enteties');

class ContractorService extends BaseService {
  constructor() {
    super(Contractor, [
      { model: Order, as: 'orders' } // Ассоциация контрагентов с заявками
    ]);
  }
}

module.exports = new ContractorService();
