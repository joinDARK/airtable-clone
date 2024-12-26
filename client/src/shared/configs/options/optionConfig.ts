import IOptionConfig from "../../interfaces/IOptionConfig";
import { conditionOptions, currencyOptions, nameMistakeOptions, stageProblemOptions, statusOptions, swiftOptions, transactionOptions } from "./options";

export const status: IOptionConfig = {
  key: "status",
  value: statusOptions
}

export const calc_condition: IOptionConfig = {
  key: "calc_condition",
  value: conditionOptions
}

export const type_transaction: IOptionConfig = {
  key: "type_transaction",
  value: transactionOptions
}

export const currency: IOptionConfig = {
  key: "currency",
  value: currencyOptions
}

export const status_swift: IOptionConfig = {
  key: "status_swift",
  value: swiftOptions
}

export const stage_problem: IOptionConfig = {
  key: "stage_problem",
  value: stageProblemOptions
}

export const stuck_money_name: IOptionConfig = {
  key: "stuck_money_name",
  value: currencyOptions
}

export const mistake_is_it_name: IOptionConfig = {
  key: "mistake_is_it_name",
  value: nameMistakeOptions
}