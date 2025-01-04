import ITable from "../../../interfaces/ITable";
import { useModalStore } from "../../../store/useModalStore";
import IRelatedData from "../../../interfaces/IRelatedData";
import { useState } from "react";
import { toast } from "react-toastify";
import { ColumnType } from "../../../types/ColumnType";
import EditInput from "./EditInput";

interface Props {
  value?: string | number | IRelatedData[];
  submit: (data: ITable) => void;
  type?: ColumnType
}

export default function EditCellModal({submit, value, type}: Props) {
  const formData = useModalStore(store => store.formData)
  const keyValue = formData ? Object.keys(formData).find(key => formData[key] === value) : "Form data is undefined";
  const [newValue, setNewValue] = useState(value);
  
  return (
    <div className="flex justify-between gap-4">
      {/* <input type="text" value={newValue as string} onChange={e => setNewValue(e.target.value)} className="p-2 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500 rounded-md flex-1"/> */}
      <EditInput type={type} value={newValue as string} change={e => setNewValue(e.target.value)}/>
      <button 
        className="p-2 bg-green-600 border border-green-500 text-white rounded-md"
        onClick={() => {
          if (keyValue) {
            submit({...formData, [keyValue]: newValue});
          } else {
            toast.error("Ошибка! Ключ ячейки не найдено");
          }
        }}
      >Сохранить</button>
    </div>
  )
}