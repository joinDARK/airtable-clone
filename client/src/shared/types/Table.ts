import IAgent from "../interfaces/table/IAgent";
import IClient from "../interfaces/table/IClient";
import IContragent from "../interfaces/table/IContragent";
import ICountry from "../interfaces/table/ICountry";
import IManager from "../interfaces/table/IManager";
import IOrder from "../interfaces/table/IOrder";
import ISubagent from "../interfaces/table/ISubagent";
import ISubagentPayer from "../interfaces/table/ISubagentPayer";

export type Table = IOrder | IAgent | ISubagent | ISubagentPayer | IManager | ICountry | IContragent | IClient;