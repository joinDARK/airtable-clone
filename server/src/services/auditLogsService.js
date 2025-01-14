const { AuditLog } = require("../db/models");
const sequelize = require("../db/index");
const { formatDate } = require("../utils/dateUtils");

class AuditLogsService {
  // Фильтрация и форматирование ответа
  filterResponse(records) {
    return records.map((record) => {
      const data = record.toJSON();

      if (data.timestamp) {
        data.timestamp = formatDate(data.timestamp);
      }

      return data;
    });
  }

  // ====== Чтение ======
  getAll = async () => {
    try {
      const records = await AuditLog.findAll();
      return this.filterResponse(records);
    } catch (error) {
      console.error(`Error fetching all records for ${AuditLog.name}:`, error);
      throw new Error("Failed to fetch all records.");
    }
  };

  getAllByUserName = async (userName) => {
    try {
      const records = await AuditLog.findAll({
        where: { userName },
      });
      return this.filterResponse(records);
    } catch (error) {
      console.error(`Error fetching logs by userName for ${AuditLog.name}:`, error);
      throw new Error("Failed to fetch logs by userName.");
    }
  };

  // ====== Удаление ======
  deleteAll = async () => {
    try {
      // Удаление всех записей (без условий)
      const deletedCount = await AuditLog.destroy({ where: {} });
      return deletedCount;
    } catch (error) {
      console.error(`Error deleting all records for ${AuditLog.name}:`, error);
      throw new Error("Failed to delete all records.");
    }
  };

  deleteById = async (id) => {
    try {
      // Удаление по конкретному id
      const deletedCount = await AuditLog.destroy({
        where: { id },
      });
      return deletedCount;
    } catch (error) {
      console.error(`Error deleting record with id=${id} for ${AuditLog.name}:`, error);
      throw new Error("Failed to delete record by id.");
    }
  };

  deleteByUserName = async (userName) => {
    try {
      // Удаление по userName
      const deletedCount = await AuditLog.destroy({
        where: { userName },
      });
      return deletedCount;
    } catch (error) {
      console.error(`Error deleting records by userName=${userName} for ${AuditLog.name}:`, error);
      throw new Error("Failed to delete records by userName.");
    }
  };
}

module.exports = new AuditLogsService();
