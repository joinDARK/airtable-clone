import {transformDate} from "../../../../modules/date_formateer/dateFormateer"
import {useModalStore} from "../../modal/store/useModalStore"
import Option from "./type-cell/Option"
import Related from "./type-cell/Related"

interface Props {
  value: string | {id: number; name?: string}[]
  title?: string
  type?: string
}

function TypeCell({type, value, title}: Props) {
  const modalHandler = useModalStore(store => store.modalHandler)
  switch (type) {
    case "option":
      return <Option />
    case "related":
      return <Related title={title} value={value as {id: number; name?: string}[]} />
    default:
      const renderValue = (value as string) ?? "—"
      return (
        <div className='w-full h-full px-6' id={type} onClick={() => modalHandler("", title)}>
          {type == "date" ? transformDate(renderValue) : renderValue}
        </div>
      )
  }
}

export default TypeCell
