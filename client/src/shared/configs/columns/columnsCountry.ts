import Column from "@classes/Column";

const columns = [
  new Column("id", "ID", true, "number", true),
  new Column("name", "Краткое название", true, "text"),
  new Column("code", "Код", true, "text"),
  new Column("full_name", "Полное наименование", true, "text"),
  new Column("orders", "Заявки", true, "related"),
];

export default columns;