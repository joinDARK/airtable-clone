const { Model } = require("sequelize");
const AuditLog = require("../AuditLog");

class BaseModel extends Model {
  static initAuditHooks() {
    this.addHook("afterCreate", async (instance, options) => {
      const userName = options?.userName || "unknown";

      await AuditLog.create({
        userName: userName,
        tableName: this.tableName,
        recordId: instance.id,
        actionType: "create",
        changedFields: Object.keys(instance.dataValues),
        previousValues: null,
        newValues: instance.dataValues,
        operationDescription: `Создана новая запись в ${this.tableName}`,
      });

      await keepOnlyLast10LogsForUser(userName);
    });

    this.addHook("beforeUpdate", (instance, options) => {
      options.previousDataValues = { ...instance._previousDataValues };
    });

    this.addHook("afterUpdate", async (instance, options) => {
      const userName = options?.userName || "unknown";
      const changedFields = instance.changed() || [];
      const previousValues = {};
      const newValues = {};

      changedFields.forEach((field) => {
        previousValues[field] = options.previousDataValues[field];
        newValues[field] = instance.dataValues[field];
      });

      await AuditLog.create({
        userName,
        tableName: this.tableName,
        recordId: instance.id,
        actionType: "update",
        changedFields,
        previousValues,
        newValues,
        operationDescription: `Обновлена запись в ${this.tableName}`,
      });

      await keepOnlyLast10LogsForUser(userName);
    });

    this.addHook("afterDestroy", async (instance, options) => {
      const userName = options?.userName || "unknown";
      await AuditLog.create({
        userName,
        tableName: this.tableName,
        recordId: instance.id,
        actionType: "delete",
        changedFields: null,
        previousValues: instance.dataValues,
        newValues: null,
        operationDescription: `Удалена запись из ${this.tableName}`,
      });

      await keepOnlyLast10LogsForUser(userName);
    });
  }
}

async function keepOnlyLast10LogsForUser(userName) {
  if (!userName) return;

  const totalCount = await AuditLog.count({ where: { userName } });
  if (totalCount <= 10) return;

  const recordsToRemove = totalCount - 10;

  const oldestLogs = await AuditLog.findAll({
    where: { userName },
    order: [["timestamp", "ASC"]],
    limit: recordsToRemove,
  });

  for (const log of oldestLogs) {
    await log.destroy();
  }
}

module.exports = BaseModel;
