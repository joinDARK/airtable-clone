import {IColumn, ITable} from "../../../types"
import TypeCell from "./TypeCell"
import {useModalStore} from "../../modal/store/useModalStore"

interface Props {
  item: ITable
  column: IColumn
}

function Cell({item, column}: Props) {
  const modalHandler = useModalStore(store => store.modalHandler)
  const key = column.key as keyof ITable;

  return (
    <td
      className='whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400'
      onClick={() => modalHandler(column.label, "", item[key])}
    >
      <TypeCell title={column.label} type={column.type} value={item[key]} />
    </td>
  )
}

export default Cell
