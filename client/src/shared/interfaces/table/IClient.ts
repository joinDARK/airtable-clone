import IName from "../IName";
import IOrderRelated from "../IOrderRelated";
import ITable from "../ITable";

export default interface IClient extends ITable, IName, IOrderRelated {
  inn?: string
}