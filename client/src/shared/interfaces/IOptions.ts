import IOption from "./IOption";

export default interface IOptions {
  status_swift: IOption[],
  type_transaction: IOption[],
  calc_condition: IOption[],
  currency: IOption[],
  status: IOption[],
  stage_problem: IOption[],
  mistake_is_it_name: IOption[],
  stuck_money_name: IOption[]
}