const orderQueries = require("./order");
const agentQueries = require("./agent");
const clientQueries = require("./client");
const contragentQueries = require("./contragent");
const managerQueries = require("./manager");
const countryQueries = require("./country");
const subagentQueries = require("./subagent");
const subagentPayerQueries = require("./subagentPayer");
const reviewerQueries = require("./reviewer");
const fileQueries = require("./file");

module.exports = {
  ...orderQueries,
  ...agentQueries,
  ...clientQueries,
  ...contragentQueries,
  ...managerQueries,
  ...countryQueries,
  ...subagentQueries,
  ...subagentPayerQueries,
  ...reviewerQueries,
  ...fileQueries,
};
