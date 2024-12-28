const orderMutations = require("./order");
const agentMutations = require("./agent");
const clientMutations = require("./client");
const contragentMutations = require("./contragent");
const managerMutations = require("./manager");
const reviewerMutations = require("./reviewer");
const countryMutations = require("./country");
const subagentMutations = require("./subagent");
const subagentPayerMutations = require("./subagentPayer");
const fileMutations = require("./file");

module.exports = {
  ...orderMutations,
  ...agentMutations,
  ...clientMutations,
  ...contragentMutations,
  ...managerMutations,
  ...reviewerMutations,
  ...countryMutations,
  ...subagentMutations,
  ...subagentPayerMutations,
  ...fileMutations,
};
