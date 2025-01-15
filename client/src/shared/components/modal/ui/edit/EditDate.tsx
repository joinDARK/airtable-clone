import DateInput from "@components/input/DateInput"
import { useModalStore } from "@store/useModalStore";
import { useState } from "react";

interface Props {
  val: { id: number, data: string, key: string };
  onSubmit: (newData: any) => Promise<void>
}

export default function EditDate({val, onSubmit}: Props) {
  const {id, data, key} = val
  const [value, setValue] = useState(data)
  const close = useModalStore(store => store.closeModal)

  return (
    <form
      className="flex gap-3"
      onSubmit={async (e) => {
        e.preventDefault()
        await onSubmit({id: id, [key]: value})
        close()
      }}
    >
      <DateInput defaultValue={data} onChange={(e) => setValue(e.target.value)}/>
      <button type="submit" title="Сохранить" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700">Сохранить</button>
    </form>
  )
}