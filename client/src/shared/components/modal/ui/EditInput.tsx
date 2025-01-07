import { ColumnType } from "@shared_types/ColumnType";
import DateInput from "@components/input/DateInput";
import TextInput from "@components/input/TextInput";

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
    case "related":
      return "Related"
    default:
      return type
  }
}