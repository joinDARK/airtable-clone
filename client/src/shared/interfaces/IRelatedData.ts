import IName from "./IName";
import ITable from "./ITable";

export default interface IRelatedData extends ITable, IName {
  id: number;
  name?: string;
}