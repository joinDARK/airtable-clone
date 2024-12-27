import IName from "../IName";
import IOrderRelated from "../IOrderRelated";
import ITable from "../ITable";

export default interface IAgent extends ITable, IName, IOrderRelated { }