import { transformDate } from "../../../../modules/date_formateer/dateFormateer"
import Option from "./type-cell/Option"
import Related from "./type-cell/Related"
import Boolean from "./type-cell/Boolean"
import { ColumnType } from "../../../types/ColumnType"
import IRelatedData from "../../../interfaces/IRelatedData"

interface Props {
  value?: string | number | boolean | IRelatedData[]
  title?: string
  type?: ColumnType
  keyCell?: string;
}

export default function TypeCell({ type, value, title, keyCell }: Props) {
  if (value == null || (Array.isArray(value) && value.length === 0)) {
    return <div className="px-2"> — </div>
  } else {
    switch (type) {
      case "option": return <Option value={value as string} keyCell={keyCell}/>
      case "related": return <Related title={title} value={value as IRelatedData[]} />
      case "boolean": return <Boolean value={value as boolean} />
      case "text": return <div className="px-2"> {value as string} </div>
      case "date": return <div className="px-2"> {transformDate(value as string)} </div>
      case "number": return <div className="px-2"> {(value as number ?? "–").toString()} </div>
      default: return <div className="px-2"> Неизвестное значение </div>
    }
  }
}