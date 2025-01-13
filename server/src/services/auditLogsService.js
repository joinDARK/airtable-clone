const { AuditLog } = require("../db/models");
const sequelize = require("../db/index");
const { formatDate } = require("../utils/dateUtils");

class AuditLogsService {

  filterResponse(records) {
    return records.map((record) => {
      return {
        id: record.id,
        userName: record.userName,
        tableName: record.tableName,
        actionType: record.actionType,
        changedFields: record.changedFields,
        timestamp: formatDate(record.timestamp),
      };
    });
  }

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
}

module.exports = new AuditLogsService();
