import { Table } from "../../../types/Table"
import IColumn from "../../../interfaces/IColumn"
import TypeCell from "./TypeCell"
import { useModalStore } from "../../../store/useModalStore"

interface Props {
  item: Table
  column: IColumn
}

function Cell({ item, column }: Props) {
  const { setModalData, modalHandler } = useModalStore()
  const key = column.key as keyof Table

  return (
    <td
      className="text-sm text-gray-900 dark:text-gray-100
                 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400
                 px-4 py-1"
      onClick={() => {
        modalHandler()
        setModalData(column.label, "", item[key])
      }}
    >
      <TypeCell title={column.label} type={column.type} value={item[key]} />
    </td>
  )
}

export default Cell
