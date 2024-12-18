const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Manager {
    id: Int!
    name: String!
    tel: String!
    date: String!
    orders: [Order]
    review_table: [Order]
  }

  type Contragent {
    id: Int!
    name: String!
    orders: [Order]
  }

  type Agent {
    id: Int!
    name: String!
    orders: [Order]
  }

  type Client {
    id: Int!
    name: String!
    inn: String!
    orders: [Order]
  }

  type Country {
    id: Int!
    name: String!
    code: String!
    full_name: String!
    orders: [Order]
  }

  type Subagent {
    id: Int!
    name: String!
    orders: [Order]
    payers: [SubagentPayer]
  }

  type SubagentPayer {
    id: Int!
    name: String!
    orders: [Order]
    subagents: [Subagent]
  }

  type File {
    id: Int!
    fileName: String!
    fileUrl: String!
    type: String
    orderId: Int
  }

  type Order {
    id: Int!
    status: String!
    order_number: Int!
    managers: [Manager]
    reviewers: [Manager]
    date: String!
    date_hired: String
    contragents: [Contragent]
    agents: [Agent]
    clients: [Client]
    client_inn: String
    name_agency: String!
    swift_code: String
    countries: [Country]
    calc_condition: String
    type_transaction: String
    number_receiving: Int
    date_instruction: String
    currency: String
    sum_order: Float
    vip_condition: String
    vip_commission: Float
    hide_commission: Float
    commision_plus_percent: Float
    commision_plus_accredit: Float
    commision_plus_escrow: Float
    money_rate: Float
    hide_money_rate: Float
    date_fixation_rate: String
    order_rate_rub: Float
    agency_award: Float
    real_award: Float
    not_ours_award: Float
    sum: Float
    letter_of_credit: Boolean!
    take_first_doc: Boolean!
    invoice: String
    date_contract_signed: String
    date_reg_bank: String
    date_open_letter_of_credit: String
    date_valet_agency: String
    date_taking_agency: String
    date_paid_rub: String
    date_unhide_letter_of_credit: String
    date_sign_act: String
    date_close_deal: String
    cycle_deal: Int
    purpose_of_payment: String
    subagents: [Subagent]
    subagentsPayers: [SubagentPayer]
    serial_num_for_payer: Int
    date_docs_agent_and_subagent: String
    date_taking_swift: String
    date_get_swift103: String
    date_take_swift103: String
    date_get_swift199: String
    date_take_swift199: String
    date_refund: String
    date_take_refund: String
    status_swift: String
    stuck_money: Boolean!
    stage_problem: String
    comment_problem: String
    stuck_money_name: String
    stuck_money_sum: Float
    mistake_is_it_name: String
    order_link: String
    invoice_link: String
    assignment_link: String
    swift_link: String
    swift103_link: String
    swift199_link: String
    act_link: String
    money_gone: Boolean!
    files: [File]
  }

  input CreateOrderInput {
    status: String!
    order_number: Int!
    managers: [Int]         
    reviewers: [Int]
    date: String!
    date_hired: String
    contragents: [Int]
    agents: [Int]
    clients: [Int]
    client_inn: String
    name_agency: String!
    swift_code: String
    countries: [Int]
    calc_condition: String
    type_transaction: String
    number_receiving: Int
    date_instruction: String
    currency: String
    sum_order: Float
    vip_condition: String
    vip_commission: Float
    hide_commission: Float
    commision_plus_percent: Float
    commision_plus_accredit: Float
    commision_plus_escrow: Float
    money_rate: Float
    hide_money_rate: Float
    date_fixation_rate: String
    order_rate_rub: Float
    agency_award: Float
    real_award: Float
    not_ours_award: Float
    sum: Float
    letter_of_credit: Boolean!
    take_first_doc: Boolean!
    invoice: String
    date_contract_signed: String
    date_reg_bank: String
    date_open_letter_of_credit: String
    date_valet_agency: String
    date_taking_agency: String
    date_paid_rub: String
    date_unhide_letter_of_credit: String
    date_sign_act: String
    date_close_deal: String
    cycle_deal: Int
    purpose_of_payment: String
    subagents: [Int]
    subagentsPayers: [Int]
    serial_num_for_payer: Int
    date_docs_agent_and_subagent: String
    date_taking_swift: String
    date_get_swift103: String
    date_take_swift103: String
    date_get_swift199: String
    date_take_swift199: String
    date_refund: String
    date_take_refund: String
    status_swift: String
    stuck_money: Boolean!
    stage_problem: String
    comment_problem: String
    stuck_money_name: String
    stuck_money_sum: Float
    mistake_is_it_name: String
    order_link: String
    invoice_link: String
    assignment_link: String
    swift_link: String
    swift103_link: String
    swift199_link: String
    act_link: String
    money_gone: Boolean!
  }

  input UpdateOrderInput {
    id: Int!
    status: String
    order_number: Int
    managers: [Int]
    reviewers: [Int]
    date: String
    date_hired: String
    contragents: [Int]
    agents: [Int]
    clients: [Int]
    client_inn: String
    name_agency: String
    swift_code: String
    countries: [Int]
    calc_condition: String
    type_transaction: String
    number_receiving: Int
    date_instruction: String
    currency: String
    sum_order: Float
    vip_condition: String
    vip_commission: Float
    hide_commission: Float
    commision_plus_percent: Float
    commision_plus_accredit: Float
    commision_plus_escrow: Float
    money_rate: Float
    hide_money_rate: Float
    date_fixation_rate: String
    order_rate_rub: Float
    agency_award: Float
    real_award: Float
    not_ours_award: Float
    sum: Float
    letter_of_credit: Boolean
    take_first_doc: Boolean
    invoice: String
    date_contract_signed: String
    date_reg_bank: String
    date_open_letter_of_credit: String
    date_valet_agency: String
    date_taking_agency: String
    date_paid_rub: String
    date_unhide_letter_of_credit: String
    date_sign_act: String
    date_close_deal: String
    cycle_deal: Int
    purpose_of_payment: String
    subagents: [Int]
    subagentsPayers: [Int]
    serial_num_for_payer: Int
    date_docs_agent_and_subagent: String
    date_taking_swift: String
    date_get_swift103: String
    date_take_swift103: String
    date_get_swift199: String
    date_take_swift199: String
    date_refund: String
    date_take_refund: String
    status_swift: String
    stuck_money: Boolean
    stage_problem: String
    comment_problem: String
    stuck_money_name: String
    stuck_money_sum: Float
    mistake_is_it_name: String
    order_file: [Int]
    order_link: String
    invoice_file: [Int]
    invoice_link: String
    assignment_file: [Int]
    assignment_link: String
    swift_file: [Int]
    swift_link: String
    swift103_file: [Int]
    swift103_link: String
    swift199_file: [Int]
    swift199_link: String
    act_file: [Int]
    act_link: String
    money_gone: Boolean
    files: [Int]
  }

  input CreateAgentInput {
    name: String!
    orders: [Int]
  }

  input UpdateAgentInput {
    id: Int!
    name: String
    orders: [Int]
  }

  input CreateClientInput {
    name: String!
    inn: String!
    orders: [Int]
  }

  input UpdateClientInput {
    id: Int!
    name: String
    inn: String
    orders: [Int]
  }

  input CreateContragentInput {
    name: String!
    orders: [Int]
  }

  input UpdateContragentInput {
    id: Int!
    name: String
    orders: [Int]
  }

  input CreateManagerInput {
    name: String!
    tel: String!
    date: String!
    orders: [Int]
    review_table: [Int]
  }

  input UpdateManagerInput {
    id: Int!
    name: String
    tel: String
    date: String
    orders: [Int]
    review_table: [Int]
  }

  input CreateCountryInput {
    name: String!
    code: String!
    full_name: String!
    orders: [Int]
  }

  input UpdateCountryInput {
    id: Int!
    name: String
    code: String
    full_name: String
    orders: [Int]
  }

  input CreateSubagentInput {
    name: String!
    orders: [Int]
  }

  input UpdateSubagentInput {
    id: Int!
    name: String
    orders: [Int]
  }

  input CreateSubagentPayerInput {
    name: String!
    orders: [Int]
  }

  input UpdateSubagentPayerInput {
    id: Int!
    name: String
    orders: [Int]
  }

  type Query {
    orders: [Order]
    order(id: Int!): Order

    agents: [Agent]
    agent(id: Int!): Agent

    clients: [Client]
    client(id: Int!): Client

    contragents: [Contragent]
    contragent(id: Int!): Contragent

    managers: [Manager]
    manager(id: Int!): Manager

    countries: [Country]
    country(id: Int!): Country

    subagents: [Subagent]
    subagent(id: Int!): Subagent

    subagentPayers: [SubagentPayer]
    subagentPayer(id: Int!): SubagentPayer

    files: [File]
    file(id: Int!): File
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    updateOrder(input: UpdateOrderInput!): Order!
    deleteOrder(id: Int!): Boolean!

    createAgent(input: CreateAgentInput!): Agent!
    updateAgent(input: UpdateAgentInput!): Agent!
    deleteAgent(id: Int!): Boolean!

    createClient(input: CreateClientInput!): Client!
    updateClient(input: UpdateClientInput!): Client!
    deleteClient(id: Int!): Boolean!

    createContragent(input: CreateContragentInput!): Contragent!
    updateContragent(input: UpdateContragentInput!): Contragent!
    deleteContragent(id: Int!): Boolean!

    createManager(input: CreateManagerInput!): Manager!
    updateManager(input: UpdateManagerInput!): Manager!
    deleteManager(id: Int!): Boolean!

    createCountry(input: CreateCountryInput!): Country!
    updateCountry(input: UpdateCountryInput!): Country!
    deleteCountry(id: Int!): Boolean!

    createSubagent(input: CreateSubagentInput!): Subagent!
    updateSubagent(input: UpdateSubagentInput!): Subagent!
    deleteSubagent(id: Int!): Boolean!

    createSubagentPayer(input: CreateSubagentPayerInput!): SubagentPayer!
    updateSubagentPayer(input: UpdateSubagentPayerInput!): SubagentPayer!
    deleteSubagentPayer(id: Int!): Boolean!
  }
`);

module.exports = schema;
