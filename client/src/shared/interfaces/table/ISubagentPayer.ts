import ITable from "../ITable";
import IName from "../IName";
import IOrderRelated from "../IOrderRelated";
import IRelatedData from "../IRelatedData";

export default interface ISubagentPayer extends ITable, IName, IOrderRelated {
  subagents: IRelatedData[]
}