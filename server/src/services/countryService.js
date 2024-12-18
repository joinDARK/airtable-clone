const BaseService = require('./baseService');
const { Country, Order } = require('../db/models');

class CountryService extends BaseService {
  constructor() {
    super(Country, [
      { model: Order, as: 'orders' }
    ]);
  }
}

module.exports = new CountryService();
