export default {
  managers: `managers { id name tel date orders { id } review_table { id } }`,
  orders: `orders { 
    id
    status
    order_number
    managers {
      id
      name
    }
    reviewers {
      id
      name
    }
    date
    date_hired
    contragents {
      id
      name
    }
    agents {
      id
      name
    }
    clients {
      id
      name
    }
    client_inn
    name_agency
    swift_code
    countries {
      id
      name
    }
    calc_condition
    type_transaction
    number_receiving
    date_instruction
    currency
    sum_order
    vip_condition
    vip_commission
    hide_commission
    commision_plus_percent
    commision_plus_accredit
    commision_plus_escrow
    money_rate
    hide_money_rate
    date_fixation_rate
    order_rate_rub
    agency_award
    real_award
    not_ours_award
    sum
    letter_of_credit
    take_first_doc
    invoice
    date_contract_signed
    date_reg_bank
    date_open_letter_of_credit
    date_valet_agency
    date_taking_agency
    date_paid_rub
    date_unhide_letter_of_credit
    date_sign_act
    date_close_deal
    cycle_deal
    purpose_of_payment
    subagents {
      id
      name
    }
    serial_num_for_payer
    date_docs_agent_and_subagent
    date_taking_swift
    date_get_swift103
    date_take_swift103
    date_get_swift199
    date_take_swift199
    date_refund
    date_take_refund
    status_swift
    stuck_money
    stage_problem
    comment_problem
    stuck_money_name
    stuck_money_sum
    mistake_is_it_name
    order_link
    invoice_link
    assignment_link
    swift_link
    swift103_link
    swift199_link
    act_link
    money_gone
  }`,
  contragents: `contragents { id name orders { id } }`,
  agents: `agents { id name orders { id } }`,
  clients: `clients { id name inn orders { id } }`,
  countries: `countries { id name code full_name orders { id } }`,
  subagents: `subagents { id name orders { id } payers { id name } }`,
  subagentPayers: `subagentPayers { id name orders { id } subagents { id name } }`,
}