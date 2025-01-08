import { ColumnType } from "@shared_types/ColumnType";
import DateInput from "@components/input/DateInput";
import TextInput from "@components/input/TextInput";
import { useModalStore } from "@store/useModalStore";
import { RelationshipSelect } from "@components/select/RelationshipSelect";
import useRelatedData from "@services/relationship/useRelatedData";
import { TableKey } from "@shared_types/TableKey";
import IRelatedData from "@interfaces/IRelatedData";

interface Props {
  type?: ColumnType;
  value: string | IRelatedData[];
  change: (e: unknown) => void;
  keyValue?: string;
}

export default function EditInput({type, value, change, keyValue}: Props) {
  const table = useModalStore(store => store.table)
  // const related = useRelatedData(table, keyValue as TableKey)

  switch(type) {
    case "text":
      return <TextInput defaultValue={value as string} onChange={change}/>
    case "date":
      return <DateInput defaultValue={value as string} onChange={change}/>
    case "related":
      return (
        <>
          {/* <RelationshipSelect value={value as IRelatedData[]} options={related} onChange={change}/> */}
          <button type="button" title="debug" onClick={() => console.debug(value, change, keyValue, table)}>Debug</button>
        </>
      )
    default:
      return type
  }
}