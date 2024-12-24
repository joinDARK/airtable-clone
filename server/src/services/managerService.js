const BaseService = require('./baseService');
const { Manager, Reviewer, Order } = require('../db/models');

class ManagerService extends BaseService {
  constructor() {
    super(Manager, [
      { model: Order, as: 'orders' },
      { model: Order, as: 'review_table' },
    ]);
  }

  // async create(data) {
  //   const manager = await super.create(data);

  //   const reviewerData = {
  //     name: manager.name,
  //     tel: manager.tel,
  //     date: manager.date,
  //   };

  //   let reviewer;
  //   try {
  //     reviewer = await Reviewer.create(reviewerData);
  //   } catch (error) {
  //     console.error(`Failed to create associated reviewer:`, error);
  //     throw new Error('Failed to create associated reviewer.');
  //   }

  //   // Связываем проверяющего с другой заявкой
  //   if (data.linkedOrderId) {
  //     const order = await Order.findByPk(data.linkedOrderId);
  //     if (order) {
  //       await reviewer.addOrder(order);
  //     } else {
  //       console.warn(`Linked order with ID ${data.linkedOrderId} not found.`);
  //     }
  //   }

  //   return manager;
  // }
}

module.exports = new ManagerService();
