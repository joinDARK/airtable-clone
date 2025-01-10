import { useState } from "react";
import { toast } from "react-toastify";

import { ColumnType } from "@shared_types/ColumnType";
import ITable from "@interfaces/ITable";
import { useModalStore } from "@store/useModalStore";
import IRelatedData from "@interfaces/IRelatedData";

import EditInput from "./EditInput";
import UploadFiles from "@components/file/File";

interface Props {
  value?: string | number | IRelatedData[];
  submit: (data: ITable) => void;
  type?: ColumnType
}

export default function EditCellModal({submit, value, type}: Props) {
  const formData = useModalStore(store => store.formData)
  const content = useModalStore(store => store.content)
  const setIsEdit = useModalStore(store => store.setIsEdit)
  const keyValue = formData ? Object.keys(formData).find(key => formData[key] === value) : "Form data is undefined";
  const [newValue, setNewValue] = useState(value);

  if(type === 'files')
    return (
      <div>
        <UploadFiles data={formData.files} typeCell={content} orderId={formData.id} editingHandler={setIsEdit}/>
      </div>
    )

  else if(type == 'text')
    return (
      <div className="flex justify-between gap-4">
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