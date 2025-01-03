import ITable from './ITable'
import IName from './IName'
import IOrderRelated from './IOrderRelated'

export default interface IFile extends ITable, IName, IOrderRelated{
    id: number
    fileName: string
    fileUrl: string
    type: string
    orderId: number
    __typename: string
}
