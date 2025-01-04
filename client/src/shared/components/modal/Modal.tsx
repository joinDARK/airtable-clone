import { Dialog } from "@headlessui/react";
import { X, Edit, SquareGantt } from "lucide-react";
import { useModalStore } from "../../store/useModalStore";
import ManagerForm from "./ui/ManagerForm";
import CellModal from "./ui/CellModal";
import IManager from "../../interfaces/table/IManager";
import View from "./ui/View";
import SubagentForm from "./ui/SubagentForm";
import ISubagent from "../../interfaces/table/ISubagent";
import clsx from "clsx";
import ITable from "../../interfaces/ITable";
import IColumn from "../../interfaces/IColumn";

interface ModalProps {
  create: (newObject: ITable) => Promise<void>
  cols: IColumn[]
}

export const Modal = ({ create, cols }: ModalProps) => {
  const { open, title, modalHandler, content, data, formData, isEdit, setIsEdit } = useModalStore()
  const config = Array.isArray(cols)
  ? cols.find(item => item.key === content)
  : undefined;

  let renderContent;

  switch (content) {
    case "managers":
      renderContent = isEdit ? <ManagerForm data={formData as IManager} onSubmit={create}/> : <View/>
      break
    case "subagents":
      renderContent = isEdit ? <SubagentForm data={formData as ISubagent} onSubmit={create}/> : <View/>
      break
    default:
      renderContent = <CellModal data={data} submit={create} type={config?.type} />
      break
  }

  return (
    <div>
      <Dialog open={open} onClose={() => modalHandler()} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-14">
          <Dialog.Panel className="mx-auto max-w-xl w-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100  rounded-lg shadow-xl max-h-[40rem]">
            <div className="flex justify-between items-center p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
              <div>
                <button
                  className={clsx(
                    "p-1 text-gray-500 transition-all",
                    !isEdit ? "hover:text-yellow-600" : "hover:text-blue-600"
                  )}
                  title={!isEdit ? "Редактировать" : "Просмотреть"}
                  onClick={() => {
                    setIsEdit(!isEdit)
                  }}
                >
                  { config?.readonly ? "" : !isEdit ? <Edit size={18} /> : <SquareGantt size={18} />}
                </button>
                <button
                  title="Закрыть"
                  type="button"
                  onClick={() => modalHandler()}
                  className="p-1 hover:bg-gray-100 hover:dark:bg-gray-600 transition-all duration-200 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-scroll p-4 resize-y">
              {renderContent}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
