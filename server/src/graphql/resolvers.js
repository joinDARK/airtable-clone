const {
  agentService,
  clientService,
  contractorService,
  countryService,
  managerService,
  orderService,
  reviewerService,
  subagentPayerService,
  subagentService,
  fileService
} = require("../services/index.js");

module.exports = {
  // Queries
  // Orders
  orders: async () => {
    const result = await orderService.getAll();
    return result || [];
  },
  order: async ({ id }) => {
    return await orderService.getById(id);
  },

  // Agents
  agents: async () => {
    const result = await agentService.getAll();
    return result || [];
  },
  agent: async ({ id }) => await agentService.getById(id),

  // Clients
  clients: async () => {
    const result = await clientService.getAll();
    return result || [];
  },
  client: async ({ id }) => {
    return await clientService.getById(id);
  },

  // Contragents
  contragents: async () => {
    const result = await contractorService.getAll();
    return result || [];
  },
  contragent: async ({ id }) => await contractorService.getById(id),

  // Managers
  managers: async () => {
    const result = await managerService.getAll();
    return result || [];
  },
  manager: async ({ id }) => await managerService.getById(id),

  // Countries
  countries: async () => {
    const result = await countryService.getAll();
    return result || [];
  },
  country: async ({ id }) => await countryService.getById(id),

  // Subagents
  subagents: async () => {
    const result = await subagentService.getAll();
    return result || [];
  },
  subagent: async ({ id }) => await subagentService.getById(id),

  // SubagentPayers
  subagentPayers: async () => {
    const result = await subagentPayerService.getAll();
    return result || [];
  },
  subagentPayer: async ({ id }) => await subagentPayerService.getById(id),

  // Reviewers
  reviewers: async () => {
    const result = await reviewerService.getAll();
    return result || [];
  },
  reviewer: async ({ id }) => await reviewerService.getById(id),

  // Files
  files: async () => {
    const result = await fileService.getAll();
    return result || [];
  },
  file: async ({ id }) => await fileService.getById(id),


  // Mutations

  // Orders
  createOrder: async ({ input }) => await orderService.create(input),
  updateOrder: async ({ input }) => {
    const { id, ...data } = input;
    return await orderService.update(id, data);
  },
  deleteOrder: async ({ id }) => {
    await orderService.delete(id);
    return true;
  },

  // Agents
  createAgent: async ({ input }) => await agentService.create(input),
  updateAgent: async ({ input }) => {
    const { id, ...data } = input;
    return await agentService.update(id, data);
  },
  deleteAgent: async ({ id }) => {
    await agentService.delete(id);
    return true;
  },

  // Clients
  createClient: async ({ input }) => await clientService.create(input),
  updateClient: async ({ input }) => {
    const { id, ...data } = input;
    return await clientService.update(id, data);
  },
  deleteClient: async ({ id }) => {
    await clientService.delete(id);
    return true;
  },

  // Contragents
  createContragent: async ({ input }) => await contractorService.create(input),
  updateContragent: async ({ input }) => {
    const { id, ...data } = input;
    return await contractorService.update(id, data);
  },
  deleteContragent: async ({ id }) => {
    await contractorService.delete(id);
    return true;
  },

  // Managers
  createManager: async ({ input }) => await managerService.create(input),
  updateManager: async ({ input }) => {
    const { id, ...data } = input;
    return await managerService.update(id, data);
  },
  deleteManager: async ({ id }) => {
    await managerService.delete(id);
    return true;
  },

  // Reviewers
  createReviewer: async ({ input }) => await reviewerService.create(input),
  updateReviewer: async ({ input }) => {
    const { id, ...data } = input;
    return await reviewerService.update(id, data);
  },
  deleteReviewer: async ({ id }) => {
    await reviewerService.delete(id);
    return true;
  },

  // Countries
  createCountry: async ({ input }) => await countryService.create(input),
  updateCountry: async ({ input }) => {
    const { id, ...data } = input;
    return await countryService.update(id, data);
  },
  deleteCountry: async ({ id }) => {
    await countryService.delete(id);
    return true;
  },

  // Subagents
  createSubagent: async ({ input }) => await subagentService.create(input),
  updateSubagent: async ({ input }) => {
    const { id, ...data } = input;
    return await subagentService.update(id, data);
  },
  deleteSubagent: async ({ id }) => {
    await subagentService.delete(id);
    return true;
  },

  // SubagentPayers
  createSubagentPayer: async ({ input }) => await subagentPayerService.create(input),
  updateSubagentPayer: async ({ input }) => {
    const { id, ...data } = input;
    return await subagentPayerService.update(id, data);
  },
  deleteSubagentPayer: async ({ id }) => {
    await subagentPayerService.delete(id);
    return true;
  },

  // Files
  createFile: async ({ input }) => await fileService.create(input),
  updateFile: async ({ input }) => {
    const { id, ...data } = input;
    return await fileService.update(id, data);
  },
  deleteFile: async ({ id }) => {
    await fileService.delete(id);
    return true;
  },
};
