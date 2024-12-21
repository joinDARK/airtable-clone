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
const { validateInput, schemas } = require("../utils/validation");

module.exports = {
  // ========================
  // QUERIES
  // ========================
  orders: async () => {
    const result = await orderService.getAll();
    return result || [];
  },
  order: async ({ id }) => {
    return await orderService.getById(id);
  },

  agents: async () => {
    const result = await agentService.getAll();
    return result || [];
  },
  agent: async ({ id }) => await agentService.getById(id),

  clients: async () => {
    const result = await clientService.getAll();
    return result || [];
  },
  client: async ({ id }) => await clientService.getById(id),

  contragents: async () => {
    const result = await contractorService.getAll();
    return result || [];
  },
  contragent: async ({ id }) => await contractorService.getById(id),

  managers: async () => {
    const result = await managerService.getAll();
    return result || [];
  },
  manager: async ({ id }) => await managerService.getById(id),

  countries: async () => {
    const result = await countryService.getAll();
    return result || [];
  },
  country: async ({ id }) => await countryService.getById(id),

  subagents: async () => {
    const result = await subagentService.getAll();
    return result || [];
  },
  subagent: async ({ id }) => await subagentService.getById(id),

  subagentPayers: async () => {
    const result = await subagentPayerService.getAll();
    return result || [];
  },
  subagentPayer: async ({ id }) => await subagentPayerService.getById(id),

  reviewers: async () => {
    const result = await reviewerService.getAll();
    return result || [];
  },
  reviewer: async ({ id }) => await reviewerService.getById(id),

  files: async () => {
    const result = await fileService.getAll();
    return result || [];
  },
  file: async ({ id }) => await fileService.getById(id),


  // ========================
  // MUTATIONS
  // ========================

  // Orders
  createOrder: async ({ input }) => {
    const validData = validateInput(input, schemas.createOrder);
    return await orderService.create(validData);
  },
  updateOrder: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateOrder);
    return await orderService.update(id, data);
  },
  deleteOrder: async ({ id }) => {
    await orderService.delete(id);
    return true;
  },

  // Agents
  createAgent: async ({ input }) => {
    const validData = validateInput(input, schemas.createAgent);
    return await agentService.create(validData);
  },
  updateAgent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateAgent);
    return await agentService.update(id, data);
  },
  deleteAgent: async ({ id }) => {
    await agentService.delete(id);
    return true;
  },

  // Clients
  createClient: async ({ input }) => {
    const validData = validateInput(input, schemas.createClient);
    return await clientService.create(validData);
  },
  updateClient: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateClient);
    return await clientService.update(id, data);
  },
  deleteClient: async ({ id }) => {
    await clientService.delete(id);
    return true;
  },

  // Contragents
  createContragent: async ({ input }) => {
    const validData = validateInput(input, schemas.createContragent);
    return await contractorService.create(validData);
  },
  updateContragent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateContragent);
    return await contractorService.update(id, data);
  },
  deleteContragent: async ({ id }) => {
    await contractorService.delete(id);
    return true;
  },

  // Managers
  createManager: async ({ input }) => {
    const validData = validateInput(input, schemas.createManager);
    return await managerService.create(validData);
  },
  updateManager: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateManager);
    return await managerService.update(id, data);
  },
  deleteManager: async ({ id }) => {
    await managerService.delete(id);
    return true;
  },

  // Reviewers
  // Если у вас есть create/update для reviewer, добавьте их аналогично:
  createReviewer: async ({ input }) => {
    const validData = validateInput(input, schemas.createManager); 
    // Предполагаем, что Reviewer может иметь похожую схему, или создайте отдельную
    return await reviewerService.create(validData);
  },
  updateReviewer: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateManager); 
    // Аналогично, используйте соответствующую схему, если нужна отдельная
    return await reviewerService.update(id, data);
  },
  deleteReviewer: async ({ id }) => {
    await reviewerService.delete(id);
    return true;
  },

  // Countries
  createCountry: async ({ input }) => {
    const validData = validateInput(input, schemas.createCountry);
    return await countryService.create(validData);
  },
  updateCountry: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateCountry);
    return await countryService.update(id, data);
  },
  deleteCountry: async ({ id }) => {
    await countryService.delete(id);
    return true;
  },

  // Subagents
  createSubagent: async ({ input }) => {
    const validData = validateInput(input, schemas.createSubagent);
    return await subagentService.create(validData);
  },
  updateSubagent: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateSubagent);
    return await subagentService.update(id, data);
  },
  deleteSubagent: async ({ id }) => {
    await subagentService.delete(id);
    return true;
  },

  // SubagentPayers
  createSubagentPayer: async ({ input }) => {
    const validData = validateInput(input, schemas.createSubagentPayer);
    return await subagentPayerService.create(validData);
  },
  updateSubagentPayer: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateSubagentPayer);
    return await subagentPayerService.update(id, data);
  },
  deleteSubagentPayer: async ({ id }) => {
    await subagentPayerService.delete(id);
    return true;
  },

  // Files
  createFile: async ({ input }) => {
    const validData = validateInput(input, schemas.createFile);
    return await fileService.create(validData);
  },
  updateFile: async ({ input }) => {
    const { id, ...data } = validateInput(input, schemas.updateFile);
    return await fileService.update(id, data);
  },
  deleteFile: async ({ id }) => {
    await fileService.delete(id);
    return true;
  },
};
