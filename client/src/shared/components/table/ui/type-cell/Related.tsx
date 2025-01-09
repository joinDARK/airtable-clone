import { TableLayoutContext } from "@components/table/TableLayout";
import IRelatedData from "@interfaces/IRelatedData"
import getRelatedData from "@services/relationship/getRelatedData";
import useRelatedData from "@services/relationship/useRelatedData";
import { useModalStore } from "@store/useModalStore"
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
  value: IRelatedData[];
  title?: string;
  columnKey?: string;
}

function Related({ value = [], columnKey }: Props) {
  const { openModal } = useModalStore()

  const context = useContext(TableLayoutContext)

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {value.map((item, i) => (
        <span
          key={i}
          onClick={(e) => {
            e.stopPropagation() // Останавливает всплытие события
            console.log(context, columnKey)
            openModal({screenType: "lookup", screenData: item, title: item.name ?? `Заявка ${item.id}`, isEdit: false})
          }}
          className="inline-flex justify-center items-center py-1 px-6 rounded-xl
                     transition-all text-sm font-medium
                     bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200
                     cursor-pointer hover:text-gray-600 hover:bg-gray-300 active:scale-90"
        >
          {item.name ?? item.id}
        </span>
      ))}
    </div>
  )
}

export default Related
