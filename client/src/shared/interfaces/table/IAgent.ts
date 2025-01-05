import IName from "@interfaces/IName";
import IOrderRelated from "@interfaces/IOrderRelated";
import ITable from "@interfaces/ITable";

export default interface IAgent extends ITable, IName, IOrderRelated { }