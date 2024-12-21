const Joi = require('joi');

// Общие схемы для повторяющихся типов
const dateISO = Joi.string().isoDate().allow(null);
const optionalIntArray = Joi.array().items(Joi.number().integer()).allow(null);

// Схема для CreateOrderInput
const createOrderSchema = Joi.object({
  status: Joi.string().required(),
  order_number: Joi.number().integer().required(),
  managers: optionalIntArray,
  reviewers: optionalIntArray,
  date: dateISO.required(),
  date_hired: dateISO,
  contragents: optionalIntArray,
  agents: optionalIntArray,
  clients: optionalIntArray,
  client_inn: Joi.string().allow(null, ''),
  name_agency: Joi.string().required(),
  swift_code: Joi.string().allow(null, ''),
  countries: optionalIntArray,
  calc_condition: Joi.string().allow(null, ''),
  type_transaction: Joi.string().allow(null, ''),
  number_receiving: Joi.number().integer().allow(null),
  date_instruction: dateISO,
  currency: Joi.string().allow(null, ''),
  sum_order: Joi.number().allow(null),
  vip_condition: Joi.string().allow(null, ''),
  vip_commission: Joi.number().allow(null),
  hide_commission: Joi.number().allow(null),
  commision_plus_percent: Joi.number().allow(null),
  commision_plus_accredit: Joi.number().allow(null),
  commision_plus_escrow: Joi.number().allow(null),
  money_rate: Joi.number().allow(null),
  hide_money_rate: Joi.number().allow(null),
  date_fixation_rate: dateISO,
  order_rate_rub: Joi.number().allow(null),
  agency_award: Joi.number().allow(null),
  real_award: Joi.number().allow(null),
  not_ours_award: Joi.number().allow(null),
  sum: Joi.number().allow(null),
  letter_of_credit: Joi.boolean().required(),
  take_first_doc: Joi.boolean().required(),
  invoice: Joi.string().allow(null, ''),
  date_contract_signed: dateISO,
  date_reg_bank: dateISO,
  date_open_letter_of_credit: dateISO,
  date_valet_agency: dateISO,
  date_taking_agency: dateISO,
  date_paid_rub: dateISO,
  date_unhide_letter_of_credit: dateISO,
  date_sign_act: dateISO,
  date_close_deal: dateISO,
  cycle_deal: Joi.number().integer().allow(null),
  purpose_of_payment: Joi.string().allow(null, ''),
  subagents: optionalIntArray,
  subagentsPayers: optionalIntArray,
  serial_num_for_payer: Joi.number().integer().allow(null),
  date_docs_agent_and_subagent: dateISO,
  date_taking_swift: dateISO,
  date_get_swift103: dateISO,
  date_take_swift103: dateISO,
  date_get_swift199: dateISO,
  date_take_swift199: dateISO,
  date_refund: dateISO,
  date_take_refund: dateISO,
  status_swift: Joi.string().allow(null, ''),
  stuck_money: Joi.boolean().required(),
  stage_problem: Joi.string().allow(null, ''),
  comment_problem: Joi.string().allow(null, ''),
  stuck_money_name: Joi.string().allow(null, ''),
  stuck_money_sum: Joi.number().allow(null),
  mistake_is_it_name: Joi.string().allow(null, ''),
  order_link: Joi.string().allow(null, ''),
  invoice_link: Joi.string().allow(null, ''),
  assignment_link: Joi.string().allow(null, ''),
  swift_link: Joi.string().allow(null, ''),
  swift103_link: Joi.string().allow(null, ''),
  swift199_link: Joi.string().allow(null, ''),
  act_link: Joi.string().allow(null, ''),
  money_gone: Joi.boolean().required()
});

// Схема для UpdateOrderInput (все поля опциональны, кроме id)
const updateOrderSchema = createOrderSchema.keys({
  id: Joi.number().integer().required()
});

// Аналогично для других вводов
const createAgentSchema = Joi.object({
  name: Joi.string().required(),
  orders: optionalIntArray
});

const updateAgentSchema = createAgentSchema.keys({
  id: Joi.number().integer().required(),
  name: Joi.string().optional()
});

const createClientSchema = Joi.object({
  name: Joi.string().required(),
  inn: Joi.string().required(),
  orders: optionalIntArray
});

const updateClientSchema = createClientSchema.keys({
  id: Joi.number().integer().required()
});

const createContragentSchema = Joi.object({
  name: Joi.string().required(),
  orders: optionalIntArray
});

const updateContragentSchema = createContragentSchema.keys({
  id: Joi.number().integer().required()
});

const createManagerSchema = Joi.object({
  name: Joi.string().required(),
  tel: Joi.string().required(),
  date: dateISO.required(),
  orders: optionalIntArray,
  review_table: optionalIntArray
});

const updateManagerSchema = createManagerSchema.keys({
  id: Joi.number().integer().required()
});

const createCountrySchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  full_name: Joi.string().required(),
  orders: optionalIntArray
});

const updateCountrySchema = createCountrySchema.keys({
  id: Joi.number().integer().required()
});

const createSubagentSchema = Joi.object({
  name: Joi.string().required(),
  orders: optionalIntArray
});

const updateSubagentSchema = createSubagentSchema.keys({
  id: Joi.number().integer().required()
});

const createSubagentPayerSchema = Joi.object({
  name: Joi.string().required(),
  orders: optionalIntArray
});

const updateSubagentPayerSchema = createSubagentPayerSchema.keys({
  id: Joi.number().integer().required()
});

const createFileSchema = Joi.object({
  fileName: Joi.string().required(),
  fileUrl: Joi.string().required(),
  type: Joi.string().allow(null, ''),
  orderId: Joi.number().integer().allow(null)
});

const updateFileSchema = createFileSchema.keys({
  id: Joi.number().integer().required()
});

/**
 * Универсальная функция валидации.
 * @param {Object} input - Входные данные mutation
 * @param {Object} schema - Joi схема для данного mutation
 */
function validateInput(input, schema) {
  const { error, value } = schema.validate(input, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    throw new Error(`Validation Error: ${message}`);
  }
  return value;
}

module.exports = {
  validateInput,
  schemas: {
    createOrder: createOrderSchema,
    updateOrder: updateOrderSchema,
    createAgent: createAgentSchema,
    updateAgent: updateAgentSchema,
    createClient: createClientSchema,
    updateClient: updateClientSchema,
    createContragent: createContragentSchema,
    updateContragent: updateContragentSchema,
    createManager: createManagerSchema,
    updateManager: updateManagerSchema,
    createCountry: createCountrySchema,
    updateCountry: updateCountrySchema,
    createSubagent: createSubagentSchema,
    updateSubagent: updateSubagentSchema,
    createSubagentPayer: createSubagentPayerSchema,
    updateSubagentPayer: updateSubagentPayerSchema,
    createFile: createFileSchema,
    updateFile: updateFileSchema
  }
};
