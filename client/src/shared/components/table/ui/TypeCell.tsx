import {transformDate} from "../../../../modules/date_formateer/dateFormateer"
import { IRelatedData } from "../../../types"
import Option from "./type-cell/Option"
import Related from "./type-cell/Related"

interface Props {
  value: string | IRelatedData[]
  title?: string
  type?: string
}

function TypeCell({type, value, title}: Props) {
  switch (type) {
    case "option":
      return <Option />
    case "related":
      if (value) {
        return <Related title={title} value={value as IRelatedData[]} />
      } else {
        return <div className='w-full h-full px-6'></div>
      }
    default:
      const renderValue = (value as string) ?? "—"
      return (
        <div className='w-full h-full px-6'>
          {type == "date" ? transformDate(renderValue) : renderValue}
        </div>
      )
  }
}

export default TypeCell
