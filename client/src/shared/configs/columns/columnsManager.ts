import Column from "../../classes/Column";

const columns = [
  new Column("id", "ID", true, "number", true),
  new Column("name", "Имя", true, "text"),
  new Column("tel", "Номер телефона", true, "text"),
  new Column("date", "День рождения", true, "date"),
  new Column("orders", "Заявки", true, "related"),
  new Column("review_table", "Проверяю", true, "related"),
];

export default columns;