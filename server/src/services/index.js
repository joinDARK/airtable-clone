const AgentService = require('./agentService');
const ClientService = require('./clientService');
const ContractorService = require('./contractorService');
const ManagerService = require('./managerService');
const ReviewerService = require('./reviwerService');
const OrderService = require('./orderService');
const SubagentService = require('./subagentServices');
const SubagentPayerService = require('./subagentPayerService');
const CountryService = require('./countryService');
const FileService = require('./fileService');
const AuthService = require('./authService');


module.exports = {
  agentService: AgentService,
  clientService: ClientService,
  contractorService: ContractorService,
  managerService: ManagerService,
  reviewerService: ReviewerService,
  orderService: OrderService,
  subagentService: SubagentService,
  subagentPayerService: SubagentPayerService,
  countryService: CountryService,
  fileService: FileService,
  authService: AuthService,
};
