const BaseService = require('./baseService');
const { Country, Order } = require('../db/entities/enteties');

class CountryService extends BaseService {
  constructor() {
    super(Country, [
      { model: Order, as: 'orders' } // Ассоциация страны с заявками
    ]);
  }
}

module.exports = new CountryService();
