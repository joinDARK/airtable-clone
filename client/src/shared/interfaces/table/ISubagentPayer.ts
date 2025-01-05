import ITable from "@interfaces/ITable";
import IName from "@interfaces/IName";
import IOrderRelated from "@interfaces/IOrderRelated";
import IRelatedData from "@interfaces/IRelatedData";

export default interface ISubagentPayer extends ITable, IName, IOrderRelated {
  subagents: IRelatedData[]
}