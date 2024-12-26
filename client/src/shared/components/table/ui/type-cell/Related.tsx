import IRelatedData from "../../../../interfaces/IRelatedData"
import { useModalStore } from "../../../../store/useModalStore"

interface Props {
  value: IRelatedData[]
  title?: string
}

function Related({ value = [] }: Props) {
  const { setModalData, modalHandler } = useModalStore()

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {value.map((item, i) => (
        <span
          key={i}
          onClick={(e) => {
            e.stopPropagation() // Останавливает всплытие события
            setModalData(item.name ?? item.id)
            modalHandler()
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
