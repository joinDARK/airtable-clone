import {z, ZodType} from "zod"

const ResOrderSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    satus: z.string().optional().nullable(),
    order_number: z.number().optional().nullable(),
    managers: z.array(RelatedSchema).nullable(),
    reviewers: z.array(RelatedSchema).nullable(),
    date: z.string().date().optional().nullable(),
    date_hired: z.string().date().optional().nullable(),
    contragent: z.array(RelatedSchema).optional().nullable(),
    agents: z.array(RelatedSchema).optional().nullable(),
    clients: z.array(RelatedSchema).optional().nullable(),
    client_inn: z.string().optional().nullable(),
    name_agency: z.string().optional().nullable(),
    swift_code: z.string().optional().nullable(),
    countries: z.array(RelatedSchema).optional().nullable(),
    calc_condition: z.string().optional().nullable(),
    type_transaction: z.string().optional().nullable(),
    number_receiving: z.number().optional().nullable(),
    date_instruction: z.string().optional().nullable(),
    currency: z.string().optional().nullable(),
    sum_order: z.number().optional().nullable(),
    vip_condition: z.string().optional().nullable(),
    vip_commission: z.number().optional().nullable(),
    hide_commission: z.number().optional().nullable(),
    commision_plus_percent: z.number().optional().nullable(),
    commision_plus_accredit: z.number().optional().nullable(),
    commision_plus_escrow: z.number().optional().nullable(),
    money_rate: z.number().optional().nullable(),
    hide_money_rate: z.number().optional().nullable(),
    date_fixation_rate: z.string().date().optional().nullable(),
    order_rate_rub: z.number().optional().nullable(),
    agency_award: z.number().optional().nullable(),
    real_award: z.number().optional().nullable(),
    not_ours_award: z.number().optional().nullable(),
    sum: z.number().optional().nullable().optional().nullable(),
    letter_of_credit: z.boolean().optional().nullable(),
    take_first_doc: z.boolean().optional().nullable(),
    invoice: z.string().date().optional().nullable(),
    date_contract_signed: z.string().date().optional().nullable(),
    date_reg_bank: z.string().date().optional().nullable(),
    date_open_letter_of_credit: z.string().date().optional().nullable(),
    date_valet_agency: z.string().date().optional().nullable(),
    date_taking_agency: z.string().date().optional().nullable(),
    date_paid_rub: z.string().date().optional().nullable(),
    date_unhide_letter_of_credit: z.string().date().optional().nullable(),
    date_sign_act: z.string().date().optional().nullable(),
    date_close_deal: z.string().date().optional().nullable(),
    cycle_deal: z.number().optional().nullable(),
    purpose_of_payment: z.string().optional().nullable(),
    subagents: z.array(RelatedSchema).optional().nullable(),
    subagentsPayers: z.array(RelatedSchema).optional().nullable(),
    serial_num_for_payer: z.number().optional().nullable(),
    date_docs_agent_and_subagent: z.string().date().optional().nullable(),
    date_taking_swift: z.string().date().optional().nullable(),
    date_get_swift103: z.string().date().optional().nullable(),
    date_take_swift103: z.string().date().optional().nullable(),
    date_get_swift199: z.string().date().optional().nullable(),
    date_take_swift199: z.string().date().optional().nullable(),
    date_refund: z.string().date().optional().nullable(),
    date_take_refund: z.string().date().optional().nullable(),
    status_swift: z.string().optional().nullable(),
    stuck_money: z.boolean().optional().nullable(),
    stage_problem: z.string().optional().nullable(),
    comment_problem: z.string().optional().nullable(),
    stuck_money_name: z.string().optional().nullable(),
    stuck_money_sum: z.number().optional().nullable(),
    mistake_is_it_name: z.string().optional().nullable(),
    order_link: z.string().optional().nullable(),
    invoice_link: z.string().optional().nullable(),
    assignment_link: z.string().optional().nullable(),
    swift_link: z.string().optional().nullable(),
    swift103_link: z.string().optional().nullable(),
    swift199_link: z.string().optional().nullable(),
    act_link: z.string().optional().nullable(),
    money_gone: z.boolean().optional().nullable(),
  })
)

const ResClientSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    inn: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
  })
)

const ResContragentSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
  })
)

const ResAgentSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
  })
)

const ResCountrySchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    code: z.string().optional().nullable(),
    full_name: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
  })
)

const ResManagerSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    tel: z.string().optional().nullable(),
    date: z.string().date(),
    orders: z.array(RelatedSchema),
    review_table: z.array(RelatedSchema),
  })
)

const ResSubagentSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
    payers: z.array(RelatedSchema),
  })
)

const ResSubagentPayerSchema: ZodType = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
    orders: z.array(RelatedSchema),
    subagents: z.array(RelatedSchema),
  })
)

const RelatedSchema: ZodType = z.object({
  id: z.number(),
  name: z.string().optional().nullable()
})

export { ResSubagentSchema, ResSubagentPayerSchema, ResOrderSchema, ResManagerSchema, ResCountrySchema, ResContragentSchema, ResClientSchema, ResAgentSchema }