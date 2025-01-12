import { Table } from "@shared_types/Table"
import IColumn from "@interfaces/IColumn"
import TypeCell from "./TypeCell"
import { useModalStore } from "@store/useModalStore"
import { useContext } from "react";
import { TableLayoutContext } from "../TableLayout";
import transformColumnKey from "@services/relationship/transformColumnKey";


interface Props {
  item: Table;
  column: IColumn;
}

export default function Cell({ item, column }: Props) {
  const { openModal, setRelatedSettings } = useModalStore()
  const key = column.key as keyof Table
  const context = useContext(TableLayoutContext)


  return (
    <td
      className="text-sm text-gray-900 dark:text-gray-100
                 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400
                 px-4 py-1"
      onClick={() => {
        if(column.type == "files")
          openModal({screenType: column.type, screenData: (item as any)[column.type], title: column.label, isEdit: false, readonly: column.readonly, screenFileType: column.key})
        else
          openModal({screenType: column.type, screenData: item[key], title: column.label, isEdit: false, readonly: column.readonly})
        if (context?.type) {
          setRelatedSettings({table: context.type, relatedKey: transformColumnKey(column.key)})
        }
      }}

    >
      <TypeCell
        title={column.label}
        type={column.type}
        value={item[key]}
        columnKey={column.key}
        item={item}
      />
    </td>
  );
}