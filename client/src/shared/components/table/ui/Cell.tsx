import { Table } from "@shared_types/Table"
import IColumn from "@interfaces/IColumn"
import TypeCell from "./TypeCell"
import { useModalStore } from "@store/useModalStore"


interface Props {
  item: Table;
  column: IColumn;
}

export default function Cell({ item, column }: Props) {
  const { openModal } = useModalStore()
  const key = column.key as keyof Table

  return (
    <td
      className="text-sm text-gray-900 dark:text-gray-100
                 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400
                 px-4 py-1"
      onClick={() => {
        openModal({screenType: column.type, screenData: null, title: column.label, isEdit: false})
      }}

    >
      <TypeCell
        title={column.label}
        type={column.type}
        value={item[column.key as keyof Table]}
        columnKey={column.key}
        item={item}
      />
    </td>
  );
}