import { ITableNames } from "../../shared/types";

const relationshipConfig: Record<ITableNames, Record<string, ITableNames>> = {
  orders: {
    clients: "clients",
    contragents: "contragents",
    agents: "agents",
    countries: "countries",
    subagents: "subagents",
    managers: "managers",
    reviewers: "managers",
    subagentPayers: "subagentPayers",
  },
  managers: {
    orders: "orders",
    review_table: "orders",
  },
  clients: {
    orders: "orders",
  },
  contragents: {
    orders: "orders",
  },
  agents: {
    orders: "orders",
  },
  countries: {
    orders: "orders",
  },
  subagents: {
    orders: "orders",
    payers: "subagentPayers",
  },
  subagentPayers: {
    orders: "orders",
    subagents: "subagents",
  },
}

export default relationshipConfig;