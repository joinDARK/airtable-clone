const {
  Agent,
  Client,
  Order,
  Manager,
  Contractor,
  Subagent,
  SubagentPayer,
  Country,
  File,
} = require("../models");

const associateModels = () => {
  // Связь "Заявка" и "Агенты"
  Order.belongsToMany(Agent, {
    through: "OrderAgents",
    as: "agents",
    onDelete: "CASCADE",
  });
  Agent.belongsToMany(Order, {
    through: "OrderAgents",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Клиенты"
  Order.belongsToMany(Client, {
    through: "OrderClients",
    as: "clients",
    onDelete: "CASCADE",
  });
  Client.belongsToMany(Order, {
    through: "OrderClients",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Контрагенты"
  Order.belongsToMany(Contractor, {
    through: "OrderContractors",
    as: "contractors",
    onDelete: "CASCADE",
  });
  Contractor.belongsToMany(Order, {
    through: "OrderContractors",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Субагенты"
  Order.belongsToMany(Subagent, {
    through: "OrderSubagents",
    as: "subagents",
    onDelete: "CASCADE",
  });
  Subagent.belongsToMany(Order, {
    through: "OrderSubagents",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Субагенты" и "Плательщики субагентов"
  Subagent.belongsToMany(SubagentPayer, {
    through: "SubagentPayerLinks",
    as: "subagentPayers",
    onDelete: "CASCADE",
  });
  SubagentPayer.belongsToMany(Subagent, {
    through: "SubagentPayerLinks",
    as: "subagents",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Менеджеры"
  Order.belongsToMany(Manager, {
    through: "OrderManagers",
    as: "managers",
    onDelete: "CASCADE",
  });
  Manager.belongsToMany(Order, {
    through: "OrderManagers",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Проверяющие"
  Order.belongsToMany(Manager, {
    through: "OrderReviewers",
    as: "reviewers",
    onDelete: "CASCADE",
  });
  Manager.belongsToMany(Order, {
    through: "OrderReviewers",
    as: "review_table",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Страны"
  Order.belongsToMany(Country, {
    through: "OrderCountries",
    as: "countries",
    onDelete: "CASCADE",
  });
  Country.belongsToMany(Order, {
    through: "OrderCountries",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь "Заявка" и "Плательщики субагентов"
  Order.belongsToMany(SubagentPayer, {
    through: "OrderSubagentPayers",
    as: "subagentPayers",
    onDelete: "CASCADE",
  });
  SubagentPayer.belongsToMany(Order, {
    through: "OrderSubagentPayers",
    as: "orders",
    onDelete: "CASCADE",
  });

  // Связь один ко многим: один заказ может иметь много файлов
  Order.hasMany(File, {
    foreignKey: "orderId", // Внешний ключ в таблице File
    as: "files", // Опционально: псевдоним для связи
  });

  // Связь обратная: каждый файл принадлежит одному заказу
  File.belongsTo(Order, {
    foreignKey: "orderId", // Внешний ключ в таблице File
    as: "order", // Опционально: псевдоним для связи
  });
};

module.exports = { associateModels };
