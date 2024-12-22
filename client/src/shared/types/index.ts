export interface IOrder { // ЗАЯВКИ
  id?: number; // (уникальный)
  autonumber: number | undefined, // Автономер (по порядку)
  status: string | undefined, // Статус (закрыта, открыта, в работе и т. д.)
  order_number: number | undefined, // Номер (№) заявки
  managers: number[] | undefined, // Менеджеры (может хранится много менеджеров которые в другой таблице)
  reviewers: number[] | undefined, // Проверяющие (может хранится много менеджеров которые в другой таблице)
  date: string | undefined, // Дата размещения (дата)
  date_hired: string | undefined, // Взята в работу (дата)
  contractors: number[] | undefined, // Контрагент (может хранится много контрагентов из таблицы контрагенты)
  agents: number[] | undefined, // Агент (может хранится много агентов из таблицы агенты)
  clients: number[] | undefined, // Клиент (может хранится много клиентов из таблицы клиенты)
  client_inn: string | undefined, // ИНН (от клиента из таблицы клиентов)
  name_agency: string | undefined, // Наименование экспортёра или импортёра
  swift_code: string | undefined, // SWIFT Код банка получателя или отправителя
  countries: number[] | undefined, // Страна (может хранится 1 страна из таблицы стран)
  calc_condition: string | undefined, // Условия расчета
  type_transaction: string | undefined, // Вид сделки
  number_receiving: number | undefined, // Номер поручения
  date_instruction: string | undefined, // Подписано поручение (дата)
  currency: string | undefined, // Валюта
  sum_order: number | undefined, // Сумма заявки
  vip_condition: string | undefined, // Условия VIP
  vip_comission: number | undefined, // VIP комиссия
  hide_commission: number | undefined,  // Скрытая комиссия
  commision_plus_percent: number | undefined, // Комиссия +% банка
  commision_plus_accredit: number | undefined, // Комиссия + аккредитив
  commision_plus_escrow: number | undefined, // Комиссия + эскроу
  money_rate: number | undefined, // Курс
  hide_money_rate: number | undefined, // Скрытый курс
  date_fixation_rate: string | undefined, // Дата фиксации курса
  order_rate_rub: number | undefined, // Заявка по курсу в рублях
  agency_award: number | undefined, // Агентское вознаграждение
  real_award: number | undefined, // Фактическое вознаграждение
  not_ours_award: number | undefined, // Агентское не наше
  sum: number | undefined, // ИТОГО
  letter_of_credit: boolean | undefined, // С аккредитивом
  take_first_doc: boolean | undefined, // Получили первичные документы
  invoice: string | undefined, // Инвойс
  date_contract_signed: string | undefined, // Подписан агент. / субагент. договор
  date_reg_bank: string | undefined, // Поставлен на учет в банке
  date_open_letter_of_credit: string | undefined, // Открыт аккредитив
  date_valet_agency: string | undefined, // Оплачена валюта поставщику (импорт) / субагенту (экспорт)
  date_taking_agency: string | undefined, // Получена валюта поставщиком (импорт) / субагентом (экспорт)
  date_paid_rub: string | undefined, // Оплачен рубль клиенту (экспорт)
  date_unhide_letter_of_credit: string | undefined, // Аккредитив раскрыт
  date_sign_act: string | undefined, // Подписан акт-отчет
  date_close_deal: string | undefined, // Сделка закрыта
  cycle_deal: number | undefined, // Цикл сделки, дн
  purpose_of_payment: string | undefined, // Назначение платежа
  subagents: number[] | undefined, // Субагент (может хранится субагент из таблицы субагентов)
  subagentsPayers: number[] | undefined, // Плательщик Субагента (может хранится плательщик субагента из таблицы плательщик субагентов)
  serial_num_for_payer: number | undefined, // Порядковый номер заявления для плательщика субагента (при импорте) / получателя (при экспорте)
  date_docs_agent_and_subagent: string | undefined, // Подготовлены документы между агентом и субагентом (дата)
  date_taking_swift: string | undefined, // Получен SWIFT
  date_get_swift103: string | undefined, // Запросили SWIFT 103
  date_take_swift103: string | undefined, // Получили SWIFT 103
  date_get_swift199: string | undefined, // Запросили SWIFT 199
  date_take_swift199: string | undefined, // Получили SWIFT 199
  date_refund: string | undefined, // Возврат запрошен
  date_take_refund: string | undefined, // Деньги по возврату получены
  status_swift: string | undefined, // Статус SWIFT
  stuck_money: boolean | undefined, // Зависли деньги
  stage_problem: string | undefined, // Стадии проблемы
  comment_problem: string | undefined, // Комментарии к заявкам по которым зависли деньги
  stuck_money_name: string | undefined, // Какая валюта зависла?
  stuck_money_sum: number | undefined, // Сумма зависла
  mistake_is_it_name: string | undefined, // Чья ошибка?
  order_link: string | undefined, // Заявка ссылка
  invoice_link: string | undefined, // Инвойс ссылка
  assignment_link: string | undefined, // Поручение ссылка
  swift_link: string | undefined, // SWIFT ссылка
  swift103_link: string | undefined, // SWIFT 103 ссылка
  swift199_link: string | undefined, // SWIFT 199 ссылка
  act_link: string | undefined, // Акт-отчет ссылка
  money_gone: boolean | undefined // Сели деньги
}

export interface IAgent {
  id?: number;
  name: string | undefined;
  orders: number[] | undefined | string;
}

export interface IClient {
  id?: number;
  name: string;
  inn: number | undefined | string;
  orders: number[] | undefined | string;
}

export interface IContragent {
  id?: number;
  name: string | undefined;
  orders: number[] | undefined | string;
}

export interface ICountry {
  id?: number;
  name: string | undefined;
  code: number | undefined | string;
  full_name: string | undefined;
  orders: number[] | undefined | string;
}

export interface IManager {
  id?: number;
  name: string | undefined;
  tel: string | undefined;
  date: string | undefined;
  orders: string[] | undefined;
  review_table: number[] | undefined | string;
}

export interface ISubagentPayer {
  id?: number;
  name: string | undefined;
  subagents: string[] | undefined | string;
  orders: number[] | undefined | string;
}

export interface ISubagent {
  id?: number;
  name: string | undefined;
  payers: string[] | undefined | string;
  orders: number[] | undefined | string;
}

export interface IStatus {
  value: string;
  label: string;
  style?: string;
}

export interface IColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: string;
  readonly?: boolean
}

export interface IRelatedData {
  id: number;
  name?: string;
}

export interface IBaseTableField {
  id?: number;
  name?: string;
}

export type ITable = IOrder | IAgent | IClient | IContragent | ICountry | IManager | ISubagentPayer | ISubagent | {}