import columnsOrder from "./tableColumnsData/columnsOrder"
import columnsManager from "./tableColumnsData/columnsManager"
import columnsContractor from "./tableColumnsData/columnsContractor"
import columnsAgent from "./tableColumnsData/columnsAgent"
import columnsClient from "./tableColumnsData/columnsClient"
import columnsCountry from "./tableColumnsData/columnsCountry"
import columnsSubagent from "./tableColumnsData/columnsSubagent"
import columnsSubagentPayer from "./tableColumnsData/columnsSubagentPayer"

export default {
  orders: {
    columns: columnsOrder,
    // apiMethod: api.orders.getById,
    label: "Заявки",
  },
  managers: {
    columns: columnsManager,
    api: {
      
    },
    label: "Менеджеры",
  },
  contragents: {
    columns: columnsContractor,
    // apiMethod: api.contractors.getById,
    label: "Контрагент",
  },
  agents: {
    columns: columnsAgent,
    // apiMethod: api.agents.getById,
    label: "Агенты",
  },
  clients: {
    columns: columnsClient,
    // apiMethod: api.clients.getById,
    label: "Клиенты",
  },
  countries: {
    columns: columnsCountry,
    // apiMethod: api.countries.getById,
    label: "Страны",
  },
  subagents: {
    columns: columnsSubagent,
    // apiMethod: api.subagents.getById,
    label: "Субагенты",
  },
  subagentPayers: {
    columns: columnsSubagentPayer,
    // apiMethod: api.subagentPayers.getById,
    label: "Плательщики Субагентов",
  },
}
