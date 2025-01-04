import clsx from "clsx";
import IRelatedData from "../../../interfaces/IRelatedData";
import ITable from "../../../interfaces/ITable";
import { useModalStore } from "../../../store/useModalStore";
import EditCellModal from "./EditCellModal";
import ViewCellModal from "./ViewCellModal";
import { ColumnType } from "../../../types/ColumnType";

interface Props {
  data?: string | IRelatedData[] | number;
  submit: (data: ITable) => void;
  type?: ColumnType;
}

function CellModal({data, submit, type = "text"}: Props) {
  const isEdit = useModalStore(store => store.isEdit)

  return (
    <div className="text-red-400">
      <div 
        className={clsx(
          "text-gray-900 dark:text-gray-100 rounded-md",
          !isEdit
            ? "p-2 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500"
            : "p-0 bg-transparent"
        )}>
        {isEdit ? <EditCellModal value={data} submit={submit} type={type} /> : <ViewCellModal value={data}/>}
      </div>
    </div>
  )
}

export default CellModal