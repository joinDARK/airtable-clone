import IName from "../IName";
import ITable from "../ITable";
import IOrderRelated from "../IOrderRelated";
import IRelatedData from "../IRelatedData";

export default interface ISubagent extends ITable, IName, IOrderRelated {
  subagentPayers: IRelatedData[]
}