const Agent = require('./tables/Agent');
const AuditLog = require('./AuditLog');
const Client = require('./tables/Client');
const Contragent = require('./tables/Contragent');
const Country = require('./tables/Country');
const File = require('./tables/File');
const Manager = require('./tables/Manager');
const Order = require('./tables/Order');
const Reviewer = require('./tables/Reviewer');
const Subagent = require('./tables/Subagent');
const SubagentPayer = require('./tables/SubagentPayer');
const User = require('./User');


module.exports = {
  Agent,
  Client,
  Contragent,
  Country,
  File,
  Manager,
  Order,
  Reviewer,
  Subagent,
  SubagentPayer,
  User,
  AuditLog, 
};
