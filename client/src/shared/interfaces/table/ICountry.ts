import ITable from '@interfaces/ITable'
import IName from '@interfaces/IName'
import IOrderRelated from '@interfaces/IOrderRelated'

export default interface ICountry extends ITable, IName, IOrderRelated {
  code?: number | string
  full_name?: string
}