import IName from "@interfaces/IName";
import ITable from "@interfaces/ITable";
import IOrderRelated from "@interfaces/IOrderRelated";
import IRelatedData from "@interfaces/IRelatedData";

export default interface ISubagent extends ITable, IName, IOrderRelated {
  subagentPayers: IRelatedData[]
}