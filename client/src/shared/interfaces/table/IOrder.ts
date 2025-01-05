import IRelatedData from '@interfaces/IRelatedData';
import ITable from '@interfaces/ITable';

export default interface IOrder extends ITable {
  autonumber?: number;
  status?: string;
  order_number?: number;
  managers: IRelatedData[];
  reviewers: IRelatedData[];
  date?: string;
  date_hired?: string;
  contragents: IRelatedData[];
  agents: IRelatedData[];
  clients: IRelatedData[];
  client_inn?: string;
  name_agency?: string;
  swift_code?: string;
  countries: IRelatedData[];
  calc_condition?: string;
  type_transaction?: string;
  number_receiving?: number;
  date_instruction?: string;
  currency?: string;
  sum_order?: number;
  vip_condition?: string;
  vip_comission?: number;
  hide_commission?: number;
  commision_plus_percent?: number;
  commision_plus_accredit?: number;
  commision_plus_escrow?: number;
  money_rate?: number;
  hide_money_rate?: number;
  date_fixation_rate?: string;
  order_rate_rub?: number;
  agency_award?: number;
  real_award?: number;
  not_ours_award?: number;
  sum?: number;
  letter_of_credit?: boolean;
  take_first_doc?: boolean;
  invoice?: string;
  date_contract_signed?: string;
  date_reg_bank?: string;
  date_open_letter_of_credit?: string;
  date_valet_agency?: string;
  date_taking_agency?: string;
  date_paid_rub?: string;
  date_unhide_letter_of_credit?: string;
  date_sign_act?: string;
  date_close_deal?: string;
  cycle_deal?: number;
  purpose_of_payment?: string;
  subagents: IRelatedData[];
  subagentsPayers: IRelatedData[];
  serial_num_for_payer?: number;
  date_docs_agent_and_subagent?: string;
  date_taking_swift?: string;
  date_get_swift103?: string;
  date_take_swift103?: string;
  date_get_swift199?: string;
  date_take_swift199?: string;
  date_refund?: string;
  date_take_refund?: string;
  status_swift?: string;
  stuck_money?: boolean;
  stage_problem?: string;
  comment_problem?: string;
  stuck_money_name?: string;
  stuck_money_sum?: number;
  mistake_is_it_name?: string;
  order_link?: string;
  invoice_link?: string;
  assignment_link?: string;
  swift_link?: string;
  swift103_link?: string;
  act_link?: string;
  money_gone?: boolean;
}