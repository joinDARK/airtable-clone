import ITable from '../ITable'
import IName from '../IName'
import IOrderRelated from '../IOrderRelated'

export default interface ICountry extends ITable, IName, IOrderRelated {
  code?: number | string
  full_name?: string
}