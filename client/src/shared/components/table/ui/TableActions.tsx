import { Edit, Trash2, SquareGantt } from "lucide-react";
import { useModalStore } from "../../../store/useModalStore";
import { useContext } from "react";
import { TableLayoutContext } from "../TableLayout";
import { IBaseTableField, ITableNames } from "../../../types";
import useDelete from "../../../../modules/graphql/useDelete";

interface TableActionsProps {
  value: IBaseTableField;
  // setIsEditing?: any;
  // isEditing?: boolean;
}

function TableActions({ value }: TableActionsProps) {
  const modalHandler = useModalStore(store => store.modalHandler)
  const context = useContext(TableLayoutContext)
  const name = value.name ?? value.id

  const { deleteData } = useDelete(context?.type, value.id)

  const handleDelete = async () => {
    return await deleteData()
  }

  return (
    <div className="flex items-center w-fit gap-2">
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-all active:scale-90"
        title="Удалить"
        onClick={() => {
          console.log(context?.type, value.id)
          handleDelete()
        }}
      >
        <Trash2 size={18} />
      </button>
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-yellow-600 transition-all active:scale-90"
        title="Редактировать"
        onClick={() => modalHandler(`Изменить ${name}`, context?.type, "", value)}
      >
        <Edit size={18} />
      </button>
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-all active:scale-90"
        title="Посмотреть в модальном окне"
      >
        <SquareGantt size={18} />
      </button>
    </div>
  )
}

export default TableActions