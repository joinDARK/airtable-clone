import { ColumnType } from "../../../types/ColumnType"
import DateInput from "../../input/DateInput";
import TextInput from "../../input/TextInput";

interface Props {
  type?: ColumnType
  value: string;
  change: (e: any) => void
}

export default function EditInput({type, value, change}: Props) {
  switch(type) {
    case "text":
      return <TextInput defaultValue={value} onChange={change}/>
    case "date":
      return <DateInput defaultValue={value} onChange={change}/>
    default:
      return type
  }
}