const BaseService = require('./baseService');
const { Client, Order } = require('../db/models');

class ClientService extends BaseService {
  constructor() {
    super(Client, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new ClientService();
