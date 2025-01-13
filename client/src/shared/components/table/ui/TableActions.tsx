import { Edit, Trash2, SquareGantt, CopyPlus } from "lucide-react";
import { useContext } from "react";

import { useModalStore } from "@store/useModalStore";
import { TableLayoutContext } from "../TableLayout";
import ITable from "@interfaces/ITable";
import IName from "@interfaces/IName";

interface TableActionsProps {
  value: ITable & IName;
  // setIsEditing?: any;
  // isEditing?: boolean;
}

function TableActions({ value }: TableActionsProps) {
  const { 
    openModal
  } = useModalStore()
  const context = useContext(TableLayoutContext)
  const name = value.name ?? value.id

  return (
    <div className="flex items-center w-fit gap-2">
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-all active:scale-90"
        title="Удалить"
        onClick={() => {
          context?.delete(value.id)
        }}
      >
        <Trash2 size={18} />
      </button>
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-yellow-600 transition-all active:scale-90"
        title="Редактировать"
        onClick={() => {
          openModal({screenType: context ? context.type : "text", screenData: value, isEdit: true, title: String(name)})
        }}
      >
        <Edit size={18} />
      </button>
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-all active:scale-90"
        title="Посмотреть в модальном окне"
        onClick={() => {
          openModal({screenType: context ? context.type : "text", screenData: value, isEdit: false, title: String(name)})
        }}
      >
        <SquareGantt size={18} />
      </button>
      <button
        className="p-1 text-gray-500 dark:text-gray-300 hover:text-lime-600 transition-all active:scale-90"
        title="Дублировать строку"
        onClick={() => {
          const {id, ...duplicateRow} = value
          context?.create(duplicateRow)
        }}
      >
        <CopyPlus size={18} />
      </button>
    </div>
  )
}

export default TableActions