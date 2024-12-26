import IOrder from './table/IOrder'
import IAgent from './table/IAgent'
import IClient from './table/IClient'
import IContragent from './table/IContragent'
import ICountry from './table/ICountry'
import IManager from './table/IManager'
import ISubagentPayer from './table/ISubagentPayer'
import ISubagent from './table/ISubagent'

export default interface IGQLData {
  data: {
    orders?: IOrder[]
    agents?: IAgent[]
    clients?: IClient[]
    contragents?: IContragent[]
    countries?: ICountry[]
    managers?: IManager[]
    subagentPayers?: ISubagentPayer[]
    subagents?: ISubagent[]
  }
}