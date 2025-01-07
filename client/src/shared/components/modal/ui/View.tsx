import { useModalStore } from "@store/useModalStore"
import configs from "@configs/index"
import IColumn from "@interfaces/IColumn";
import { transformDate } from "@services/date_formateer/dateFormateer"
import IRelatedData from "@interfaces/IRelatedData";

export default function View() {
  const view = useModalStore(store => store.formData)
  const configKey = useModalStore(store => store.content) as keyof typeof configs;
  const config = configs[configKey]?.columns || [];

  const render = (data: any, col: IColumn) => {
    const value = data[col.key]
    switch (col.type) {
      case "date":
        return transformDate(value)
      case "related":
        return (
          <div className="flex gap-2 flex-wrap">
            { Array.isArray(value) && value.length != 0 ?
            (value as IRelatedData[]).map((obj, i) => (
              <div key={i} className="px-4 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">{obj.name ?? obj.id}</div>
            )) : "—"}
          </div>
        )
      default: 
        return `${value}`
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {config.map(val => (
          <div key={val.key} className="flex items-center gap-3">
            <p>{val.label}:</p>
            <div className="p-2 text-xs border rounded-md bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600">
              {render(view, val)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}