import {z, ZodType} from "zod"

const FormOrderSchema: ZodType = z.object({
  id: z.number().optional(),
  satus: z.string().optional(),
  order_number: z.number().optional(),
  managers: z.array(z.number()),
  reviewers: z.array(z.number()),
  date: z.string().date().optional(),
  date_hired: z.string().date().optional(),
  contragent: z.array(z.number()).optional(),
  agents: z.array(z.number()).optional(),
  clients: z.array(z.number()).optional(),
  client_inn: z.string().optional(),
  name_agency: z.string().optional(),
  swift_code: z.string().optional(),
  countries: z.array(z.number()).optional(),
  calc_condition: z.string().optional(),
  type_transaction: z.string().optional(),
  number_receiving: z.number().optional(),
  date_instruction: z.string().optional(),
  currency: z.string().optional(),
  sum_order: z.number().optional(),
  vip_condition: z.string().optional(),
  vip_commission: z.number().optional(),
  hide_commission: z.number().optional(),
  commision_plus_percent: z.number().optional(),
  commision_plus_accredit: z.number().optional(),
  commision_plus_escrow: z.number().optional(),
  money_rate: z.number().optional(),
  hide_money_rate: z.number().optional(),
  date_fixation_rate: z.string().date().optional(),
  order_rate_rub: z.number().optional(),
  agency_award: z.number().optional(),
  real_award: z.number().optional(),
  not_ours_award: z.number().optional(),
  sum: z.number().optional().optional(),
  letter_of_credit: z.boolean().optional(),
  take_first_doc: z.boolean().optional(),
  invoice: z.string().date().optional(),
  date_contract_signed: z.string().date().optional(),
  date_reg_bank: z.string().date().optional(),
  date_open_letter_of_credit: z.string().date().optional(),
  date_valet_agency: z.string().date().optional(),
  date_taking_agency: z.string().date().optional(),
  date_paid_rub: z.string().date().optional(),
  date_unhide_letter_of_credit: z.string().date().optional(),
  date_sign_act: z.string().date().optional(),
  date_close_deal: z.string().date().optional(),
  cycle_deal: z.number().optional(),
  purpose_of_payment: z.string().optional(),
  subagents: z.array(z.number()).optional(),
  subagentsPayers: z.array(z.number()).optional(),
  serial_num_for_payer: z.number().optional(),
  date_docs_agent_and_subagent: z.string().date().optional(),
  date_taking_swift: z.string().date().optional(),
  date_get_swift103: z.string().date().optional(),
  date_take_swift103: z.string().date().optional(),
  date_get_swift199: z.string().date().optional(),
  date_take_swift199: z.string().date().optional(),
  date_refund: z.string().date().optional(),
  date_take_refund: z.string().date().optional(),
  status_swift: z.string().optional(),
  stuck_money: z.boolean().optional(),
  stage_problem: z.string().optional(),
  comment_problem: z.string().optional(),
  stuck_money_name: z.string().optional(),
  stuck_money_sum: z.number().optional(),
  mistake_is_it_name: z.string().optional(),
  order_link: z.string().optional(),
  invoice_link: z.string().optional(),
  assignment_link: z.string().optional(),
  swift_link: z.string().optional(),
  swift103_link: z.string().optional(),
  swift199_link: z.string().optional(),
  act_link: z.string().optional(),
  money_gone: z.boolean().optional(),
})

const FormClientSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  inn: z.string().min(1),
  orders: z.array(z.number()),
})

const FormContragentSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  orders: z.array(z.number()),
})

const FormAgentSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  orders: z.array(z.number()),
})

const FormCountrySchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  code: z.string().min(1),
  full_name: z.string().min(1),
  orders: z.array(z.number()),
})

const FormManagerSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  tel: z.string().min(1),
  date: z.string().date(),
  orders: z
    .array(z.object({ id: z.number(), name: z.string().optional() }))
    .transform((data) => data.map((item) => item.id))
    .optional(),
  review_table: z
    .array(z.object({ id: z.number(), name: z.string().optional() }))
    .transform((data) => data.map((item) => item.id))
    .optional(),
})

const FormSubagentSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  orders: z.array(z.number()),
  payers: z.array(z.number()),
})

const FormSubagentPayerSchema: ZodType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  orders: z.array(z.number()),
  subagents: z.array(z.number()),
})

const UserShema: ZodType = z.object({
  login: z.string().min(1),
  password: z.string().min(1)
})

export {FormClientSchema, FormContragentSchema, FormAgentSchema, FormCountrySchema, FormOrderSchema, FormSubagentPayerSchema, FormSubagentSchema, FormManagerSchema, UserShema}
