const sequelize = require("../db/index");
const { formatDate } = require("../utils/dateUtils");

class BaseService {
  constructor(model, includes = []) {
    this.model = model;
    this.includes = includes;
  }

  filterSingleRecord(record) {
    const filteredRecord = record.toJSON();

    if (filteredRecord.date) {
      filteredRecord.date = formatDate(filteredRecord.date);
    }
    if (filteredRecord.date_hired) {
      filteredRecord.date_hired = formatDate(filteredRecord.date_hired);
    }

    this.includes.forEach((include) => {
      const alias = include.as;

      if (!filteredRecord[alias]) {
        filteredRecord[alias] = [];
      }

      if (alias === "files" && Array.isArray(filteredRecord[alias])) {
        filteredRecord[alias] = filteredRecord[alias].map((fileRecord) => ({
          id: fileRecord.id,
          fileName: fileRecord.fileName,
          fileUrl: fileRecord.fileUrl,
          type: fileRecord.type || alias,
          orderId: fileRecord.orderId,
        }));
      }
    });

    return filteredRecord;
  }

  filterResponse(data) {
    if (Array.isArray(data)) {
      return data.map((item) => this.filterSingleRecord(item));
    } else {
      return this.filterSingleRecord(data);
    }
  }

  async getAll() {
    try {
      const records = await this.model.findAll({ include: this.includes });
      return this.filterResponse(records) || [];
    } catch (error) {
      console.error(
        `Error fetching all records for ${this.model.name}:`,
        error
      );
      throw new Error("Failed to fetch all records.");
    }
  }

  async getById(id) {
    try {
      const record = await this.model.findByPk(id, { include: this.includes });
      if (!record) {
        throw new Error(`Record with id ${id} not found.`);
      }
      return this.filterSingleRecord(record);
    } catch (error) {
      console.error(
        `Error fetching record by ID for ${this.model.name}:`,
        error
      );
      throw new Error("Failed to fetch record by ID.");
    }
  }

  async create(data) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      if (!transaction) {
        throw new Error("Unable to create transaction");
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      throw new Error("Transaction creation failed.");
    }

    try {
      // Форматируем даты перед созданием
      if (data.date) data.date = formatDate(data.date);
      if (data.date_hired) data.date_hired = formatDate(data.date_hired);

      const newEntity = await this.model.create(data, { transaction });

      for (const include of this.includes) {
        const alias = include.as;
        const methodName = `set${
          alias.charAt(0).toUpperCase() + alias.slice(1)
        }`;

        if (data[alias] && typeof newEntity[methodName] === "function") {
          await newEntity[methodName](data[alias], { transaction });
        }
      }

      await transaction.commit();

      // После коммита повторно загрузим объект со всеми include
      const reloadedEntity = await this.model.findByPk(newEntity.id, {
        include: this.includes,
      });
      return this.filterSingleRecord(reloadedEntity);
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(`Error creating record for ${this.model.name}:`, error);
      throw new Error("Failed to create record.");
    }
  }

  async update(id, data) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      if (!transaction) {
        throw new Error("Unable to create transaction");
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      throw new Error("Transaction creation failed.");
    }

    try {
      const entity = await this.model.findByPk(id, { transaction });
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }

      // Форматируем даты перед обновлением
      if (data.date) data.date = formatDate(data.date);
      if (data.date_hired) data.date_hired = formatDate(data.date_hired);

      await entity.update(data, { transaction });

      for (const include of this.includes) {
        const alias = include.as;
        const methodName = `set${
          alias.charAt(0).toUpperCase() + alias.slice(1)
        }`;

        if (data[alias] && typeof entity[methodName] === "function") {
          let relatedData = data[alias];

          if (alias === "files" && Array.isArray(relatedData)) {
            relatedData = relatedData.map((file) => file.id);
          }

          await entity[methodName](relatedData, { transaction });
        }
      }

      await transaction.commit();

      // После обновления перезагрузим данные с include
      const reloadedEntity = await this.model.findByPk(id, {
        include: this.includes,
      });
      return this.filterSingleRecord(reloadedEntity);
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(`Error updating record for ${this.model.name}:`, error);
      throw new Error("Failed to update record.");
    }
  }

  async delete(id) {
    try {
      const entity = await this.model.findByPk(id);
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }
      await entity.destroy();
      return { message: "Entity deleted successfully" };
    } catch (error) {
      console.error(`Error deleting record for ${this.model.name}:`, error);
      throw new Error("Failed to delete record.");
    }
  }
}

module.exports = BaseService;
