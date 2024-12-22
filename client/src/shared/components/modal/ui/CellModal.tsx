import { IRelatedData } from "../../../types";
import { transformDate } from "../../../../modules/date_formateer/dateFormateer";

interface Props {
  data?: string | IRelatedData[]
}

function CellModal({data}: Props) {
  let render;

  if (typeof data === "string") {
    render = data.length != 0 ? transformDate(data) : "Нету данных"
  } else if (typeof data === "number") {
    render = "Это число"
  } else if (Array.isArray(data)) {
    render = <div className='flex flex-wrap gap-2'>
      {data.map((tag: IRelatedData, i) => (
        <span key={i} className='inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
          {tag.name ?? tag.id}
        </span>
      ))}
    </div>
  }

  return (
    <div className="text-red-400">
      <div className="text-gray-900 dark:text-gray-100">
        {render}
      </div>
      <button type="button" onClick={() => {
        console.log(typeof data, data)
      }}>Check</button>
    </div>
  )
}

export default CellModal