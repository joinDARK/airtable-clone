import Column from "@classes/Column";

const columns = [
  new Column("id", "ID", true, "number", true),
  new Column("autonumber", "Автономер", true, "number"),
  new Column("status", "Статус", true, "option"),
  new Column("order_number", "№ заявки", true, "text"),
  new Column("managers", "Менеджеры", false, "related"),
  new Column("reviewers", "Проверяющие", false, "related"),
  new Column("date", "Дата размещения", true, "date"),
  new Column("date_hired", "Взята в работу", true, "date"),
  new Column("contractors", "Контрагент", false, "related"),
  new Column("agents", "Агенты", false, "related"),
  new Column("clients", "Клиенты", false, "related"),
  new Column("client_inn", "ИНН клиента", true, "text", true),
  new Column("name_agency", "Наименование экспортёра/импортёра", true, "text"),
  new Column("swift_code", "SWIFT код банка получателя (при импорте) / отправителя (при экспорте)", true, "text"),
  new Column("countries", "Страна", true, "related"),
  new Column("calc_condition", "Условия расчета", true, "option"),
  new Column("type_transaction", "Вид сделки", true, "option"),
  new Column("number_receiving", "Номер поручения", true, "text"),
  new Column("currency", "Валюта", true, "option"),
  new Column("date_instruction", "Подписано поручение (для Совкомбанка)", true, "date"), // Возможно нужно будет убрать
  new Column("sum_order", "Сумма заявки", true, "number"),
  new Column("vip_condition", "Условия VIP", true, "text"),
  new Column("vip_commission", "VIP Комиссия", true, "number"),
  new Column("commision_plus_percent", "Комиссия +% банка", true, "number"),
  new Column("commision_plus_accredit", "Комиссия + Аккредитив", true, "number"),
  new Column("commision_plus_escrow", "Комиссия + Эскроу", true, "number"),
  new Column("hide_commission", "Скрытая комиссия", true, "number"),
  new Column("money_rate", "Курс", true, "number"),
  new Column("hide_money_rate", "Скрытый курс", true, "number"),
  new Column("date_fixation_rate", "Дата фиксации курса", true, "date"),
  new Column("order_rate_rub", "Заявка по курсу в рублях", true, "text"),
  new Column("agency_award", "Агентское вознаграждение", true, "number"),
  new Column("real_award", "Фактическое вознаграждение", true, "number"),
  new Column("not_ours_award", "Агентское не наше", true, "number"),
  new Column("sum", "ИТОГО", true, "number"),
  new Column("letter_of_credit", "С аккредитивом", true, "boolean"),
  new Column("take_first_doc", "Получили первичные документы", true, "boolean"),
  new Column("invoice", "Выставлен инвойс на поставщика (импорт) / на отправителя (экспорт)", true, "date"),
  new Column("invoice_file", "Инвойс", false, "files"),
  new Column("invoice_link", "Ссылка на инвойс", false, "text"),
  new Column("date_contract_signed", "Подписан агент. / субагент. договор", true, "date"),
  new Column("date_reg_bank", "Поставлен на учет в банке", true, "date"),
  new Column("date_open_letter_of_credit", "Открыт аккредитив", true, "date"), 
  new Column("date_valet_agency", "Оплачена валюта поставщику (импорт) / субагенту (экспорт)", true, "date"),
  new Column("date_taking_agency", "Получена валюта поставщиком (импорт) / субагентом (экспорт)", true, "date"), // Возможно нужно будет убрать
  new Column("date_paid_rub", "Оплачен рубль клиенту (экспорт)", true, "date"), // Возможно нужно будет убрать
  new Column("date_unhide_letter_of_credit", "Аккредитив раскрыт", true, "date"), // Возможно нужно будет убрать
  new Column("date_sign_act", "Подписан акт-отчет", true, "date"), // Возможно нужно будет убрать
  new Column("date_close_deal", "Сделка закрыта", true, "date"), // Возможно нужно будет убрать
  new Column("cycle_deal", "Цикл сделки (дни)", true, "number"), // Возможно нужно будет убрать
  new Column("purpose_of_payment", "Назначение платежа", true, "text"), // Возможно нужно будет убрать
  new Column("subagents", "Субагент", false, "related"), // Возможно нужно будет убрать
  new Column("subagentsPayers", "Плательщик субагента", false, "related"), // Возможно нужно будет убрать
  new Column("serial_num_for_payer", "Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)", true, "text"), // Возможно нужно будет убрать
  new Column("date_docs_agent_and_subagent", "Подготовлены документы между агентом и субагентом (дата)", true, "date"), // Возможно нужно будет убрать
  new Column("date_taking_swift", "Получен SWIFT", true, "date"), // Возможно нужно будет убрать
  new Column("date_get_swift103", "Запросили SWIFT 103", true, "date"), // Возможно нужно будет убрать
  new Column("date_take_swift103", "Получили SWIFT 103", true, "date"), // Возможно нужно будет убрать
  new Column("date_get_swift199", "Запросили SWIFT 199", true, "date"), // Возможно нужно будет убрать
  new Column("date_take_swift199", "Получили SWIFT 199", true, "date"), // Возможно нужно будет убрать
  new Column("date_refund", "Возврат запрошен", true, "date"), // Возможно нужно будет убрать
  new Column("date_take_refund", "Деньги по возврату получены", true, "date"), // Возможно нужно будет убрать
  new Column("status_swift", "Статус SWIFT", true, "option"), // Возможно нужно будет убрать
  new Column("stuck_money", "Зависли деньги", true, "boolean"), // Возможно нужно будет убрать
  new Column("stage_problem", "Стадии проблемы", true, "option"), // Возможно нужно будет убрать
  new Column("comment_problem", "Комментарии к заявкам по которым зависли деньги", false, "text"), // Возможно нужно будет убрать
  new Column("stuck_money_name", "Какая валюта зависла?", true, "option"), // Возможно нужно будет убрать
  new Column("stuck_money_sum", "Сумма зависла", true, "number"), // Возможно нужно будет убрать
  new Column("mistake_is_it_name", "Чья ошибка?", true, "option"), // Возможно нужно будет убрать
  new Column("order_file", "Заявка", false, "files"), // Возможно нужно будет убрать
  new Column("order_link", "Ссылка на заявку", false, "text"), // Возможно нужно будет убрать
  new Column("assignment_file", "Поручение", false, "files"),  // Возможно нужно будет убрать
  new Column("assignment_link", "Ссылка на поручение", false, "text"),  // Возможно нужно будет убрать
  new Column("swift_file", "SWIFT", false, "files"),  // Возможно нужно будет убрать
  new Column("swift_link", "Ссылка на SWIFT", false, "text"),  // Возможно нужно будет убрать
  new Column("swift103_file", "SWIFT 103", false, "files"),  // Возможно нужно будет убрать
  new Column("swift103_link", "Ссылка на SWIFT 103", false, "text"),  // Возможно нужно будет убрать
  new Column("swift199_file", "SWIFT 199", false, "files"),  // Возможно нужно будет убрать
  new Column("swift199_link", "Ссылка на SWIFT 199", false, "text"),  // Возможно нужно будет убрать
  new Column("act_file", "Акт-отчет", false, "files"),  // Возможно нужно будет убрать
  new Column("act_link", "Ссылка на акт-отчет", false, "text"),  // Возможно нужно будет убрать
  new Column("money_gone", "Сели деньги", true, "boolean"),  // Возможно нужно будет убрать
];

export default columns;