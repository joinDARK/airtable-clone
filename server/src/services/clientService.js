const BaseService = require('./baseService');
const { Client, Order } = require('../db/entities/enteties');

class ClientService extends BaseService {
  constructor() {
    super(Client, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new ClientService();
