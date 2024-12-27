import IOption from "../../interfaces/IOption"

export const status_swift: IOption[] = [
  {value: "Заявка закрыта", label: "Заявка закрыта"},
  {value: "Возврат", label: "Возврат"},
  {value: "Деньги у получателя", label: "Деньги у получателя"},
  {value: "SWIFT получен", label: "SWIFT получен"},
  {value: "SWIFT 103 запрошен", label: "SWIFT 103 запрошен"},
  {value: "Заявление отправлено", label: "Заявление отправлено"},
]

export const type_transaction: IOption[] = [
  {value: "Импорт", label: "Импорт"},
  {value: "Экспорт", label: "Экспорт"},
]

export const calc_condition: IOption[] = [
  {value: "Аккредитив", label: "Аккредитив", style: "bg-gray-100 text-gray-800 border-gray-200"},
  {value: "Предоплата", label: "Предоплата", style: "bg-gray-100 text-gray-800 border-gray-200"},
  {value: "Постоплата", label: "Постоплата", style: "bg-gray-100 text-gray-800 border-gray-200"},
  {value: "Эскроу", label: "Эскроу", style: "bg-gray-100 text-gray-800 border-gray-200"},
]

export const currency: IOption[] = [
  {value: "Юань", label: "Юань"},
  {value: "Доллар", label: "Доллар"},
  {value: "Евро", label: "Евро"},
  {value: "Дирхам", label: "Дирхам"},
]

export const status: IOption[] = [
  {value: "Заявка закрыта", label: "Заявка закрыта", style: "bg-green-100 text-green-800 border-green-200"},
  {value: "15. Возврат", label: "15. Возврат", style: "bg-amber-100 text-amber-800 border-amber-200"},
  {value: "17. Деньги у получателя", label: "17. Деньги у получателя", style: "bg-yellow-100 text-yellow-800 border-yellow-200"},
  {value: "Отменено клиентом", label: "Отменено клиентом", style: "bg-red-100 text-red-800 border-red-200"},
  {value: "1. Не создан чат", label: "1. Не создан чат", style: "bg-orange-100 text-orange-800 border-orange-200"},
  {
    value: "Cогласован получатель (только для Экспорта)",
    label: "Cогласован получатель (только для Экспорта)",
    style: "bg-lime-100 text-lime-800 border-lime-200",
  },
  {value: "1'. Cоздан чат", label: "1'. Cоздан чат", style: "bg-emerald-100 text-emerald-800 border-emerald-200"},
  {value: "4. Подписан агент. договор", label: "4. Подписан агент. договор", style: "bg-teal-100 text-teal-800 border-teal-200"},
  {value: "Ждем рубли", label: "Ждем рубли", style: "bg-cyan-100 text-cyan-800 border-cyan-200"},
  {value: "5. Выставлен инвойс на плательщика", label: "5. Выставлен инвойс на плательщика", style: "bg-sky-100 text-sky-800 border-sky-200"},
  {value: "3. Согласование плательщика", label: "3. Согласование плательщика", style: "bg-blue-100 text-blue-800 border-blue-200"},
  {value: "Ждём валюту (только для Экспорта)", label: "Ждём валюту (только для Экспорта)", style: "bg-indigo-100 text-indigo-800 border-indigo-200"},
  {value: "9. Передано на оплату", label: "9. Передано на оплату", style: "bg-violet-100 text-violet-800 border-violet-200"},
  {value: "7. Подписано поручение", label: "7. Подписано поручение", style: "bg-purple-100 text-purple-800 border-purple-200"},
  {value: "10. Получен свифт", label: "10. Получен свифт", style: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200"},
  {
    value: "17`. Ждём поступление валюты получателю",
    label: "17`. Ждём поступление валюты получателю",
    style: "bg-pink-100 text-pink-800 border-pink-200",
  },
  {value: "Получили рубли", label: "Получили рубли", style: "bg-green-100 text-green-800 border-green-200"},
  {value: "11. Запрошен свифт 103", label: "11. Запрошен свифт 103", style: "bg-rose-100 text-rose-800 border-rose-200"},
  {value: "6. Зафиксирован курс", label: "6. Зафиксирован курс", style: "bg-sky-100 text-sky-800 border-sky-200"},
]

// export const booleanStatus = [
//   { value: "true", label: "Да" },
//   { value: "false", label: "Нет" },
// ];

export const stage_problem: IOption[] = [
  {value: "Деньги не сели поставщику", label: "Деньги не сели поставщику"},
  {value: "Возврат с повторной оплатой", label: "Возврат с повторной оплатой"},
  {value: "Возврат с последующей отменой", label: "Возврат с последующей отменой"},
]

export const mistake_is_it_name: IOption[] = [
  {value: "Менеджер", label: "Менеджер"},
  {value: "Клиент", label: "Клиент"},
]

export const stuck_money_name: IOption[] = [...currency]
