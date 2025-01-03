import Column from "../../classes/Column";

const columns = [
  new Column("id", "ID", true, "number", true),
  new Column("name", "Наименование", true, "text"),
  new Column("inn", "ИНН", true, "text"),
  new Column("orders", "Заявки", true, "related"),
];

export default columns;