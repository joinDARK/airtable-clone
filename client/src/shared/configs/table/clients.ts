import TableConfig from "../../classes/TableConfig";
import columns from "../columns/columnsClient";

const clients = new TableConfig("Клиенты", "clients", columns, "Клиенты");

export default clients;
