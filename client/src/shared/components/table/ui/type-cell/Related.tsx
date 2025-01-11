import { TableLayoutContext } from "@components/table/TableLayout";
import IRelatedData from "@interfaces/IRelatedData"
import getRelatedData from "@services/relationship/getRelatedData";
import transformColumnKey from "@services/relationship/transformColumnKey";
import { useModalStore } from "@store/useModalStore"
import { useContext } from "react";

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
          onClick={async (e) => {
            e.stopPropagation() // Останавливает всплытие события
            if (context && columnKey) {
              const relatedKey = transformColumnKey(columnKey);
              const res = await getRelatedData(context.type, columnKey, item);
              const updatedSettings = {
                table: context.type,
                relatedKey: relatedKey,
                data: res
              };
              openModal({
                screenType: updatedSettings.relatedKey,
                screenData: updatedSettings.data,
                title: item.name ?? `Заявка ${item.id}`,
                isEdit: false
              });
            } else {
              console.error("Пустой context и columnKey");
            }
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
