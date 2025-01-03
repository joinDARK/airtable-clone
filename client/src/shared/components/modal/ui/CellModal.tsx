import IRelatedData from "../../../interfaces/IRelatedData";
import { transformDate } from "../../../../modules/date_formateer/dateFormateer";
import { useModalStore } from "../../../store/useModalStore";
import ViewCellModal from "./ViewCellModal";

interface Props {
  data?: string | IRelatedData[] | number
}

function CellModal({data}: Props) {

  const isEdit = useModalStore(store => store.isEdit)

  return (
    <div className="text-red-400">
      <div className="text-gray-900 dark:text-gray-100 p-[10px] bg-gray-300 rounded-md dark:bg-gray-600 border dark:border-gray-500">
        {isEdit ? "Окно редактирование" : <ViewCellModal value={data}/>}
      </div>
    </div>
  )
}

export default CellModal