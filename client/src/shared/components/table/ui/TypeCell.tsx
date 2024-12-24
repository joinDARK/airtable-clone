import {transformDate} from "../../../../modules/date_formateer/dateFormateer"
import { IRelatedData } from "../../../types"
import Option from "./type-cell/Option"
import Related from "./type-cell/Related"
import Boolean from "./type-cell/Boolean"

interface Props {
  value: string | IRelatedData[] | boolean | null;
  title?: string;
  type?: string;
  key?: string;
}

function TypeCell({type, value, title}: Props) {
  switch (type) {
    case "option":
      return <Option value={value as string} />
    case "related":
      if (value) {
        return <Related title={title} value={value as IRelatedData[]} />
      } else {
        return <div className='w-full h-full px-6'>–</div>
      }
    case "boolean":
      return <Boolean value={value as boolean}/>
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
