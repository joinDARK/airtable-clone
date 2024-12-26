class BaseResolver {
  constructor(service) {
    this.service = service;
  }

  getAll() {
    return async () => {
      const result = await this.service.getAll();
      return result || [];
    };
  }

  getById() {
    return async ({ id }) => {
      return await this.service.getById(id);
    };
  }
}

module.exports = BaseResolver;