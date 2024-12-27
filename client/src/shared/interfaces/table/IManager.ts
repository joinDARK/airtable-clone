import ITable from '../ITable'
import IName from '../IName'
import IOrderRelated from '../IOrderRelated'
import IRelatedData from '../IRelatedData'

export default interface IManager extends ITable, IName, IOrderRelated {
  tel?: string
  date?: string
  review_table: IRelatedData[]
}