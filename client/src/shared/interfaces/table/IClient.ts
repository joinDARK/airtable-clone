import IName from "@interfaces/IName";
import IOrderRelated from "@interfaces/IOrderRelated";
import ITable from "@interfaces/ITable";

export default interface IClient extends ITable, IName, IOrderRelated {
  inn?: string
}