import ITable from '@interfaces/ITable'
import IName from '@interfaces/IName'
import IOrderRelated from '@interfaces/IOrderRelated'
import IRelatedData from '@interfaces/IRelatedData'

export default interface IManager extends ITable, IName, IOrderRelated {
  tel?: string
  date?: string
  review_table: IRelatedData[]
}