import { useModalStore } from "../../../../modal/store/useModalStore"

interface Props {
  value: {id: number, name?: string}[]
}

function Related({value}: Props) {
  const modalHandler = useModalStore(store => store.modalHandler)
  return (
    <div className='flex flex-wrap gap-2 px-6 py-4' onClick={() => modalHandler()}>
      {value.map((item, i) => (
        <span key={i} onClick={() => {
          modalHandler(item.name ?? item.id)
          }} className='inline-flex items-center px-8 py-1 rounded-xl transition-all text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300 active:scale-90'>
          {item.name ?? item.id}
        </span>
      ))}
    </div>
  )
}

export default Related