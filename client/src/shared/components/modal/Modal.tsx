import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useModalStore } from "../../store/useModalStore";
import ManagerForm from "./ui/ManagerForm";
import CellModal from "./ui/CellModal";
import IManager from "../../interfaces/table/IManager";
import View from "./ui/View";
import SubagentForm from "./ui/SubagentForm";
import ISubagent from "../../interfaces/table/ISubagent";

interface ModalProps<T> {
  create: (newManager: T) => Promise<void>
}

export const Modal = <T extends unknown>({ create }: ModalProps<T>) => {
  const { open, title, modalHandler, content, data, formData, isEdit } = useModalStore()

  let renderContent;

  switch (content) {
    case "managers":
      renderContent = isEdit ? <ManagerForm data={formData as IManager} onSubmit={create}/> : <View/>
      break
    case "subagents":
      renderContent = isEdit ? <SubagentForm data={formData as ISubagent} onSubmit={create}/> : <View/>
      break
    default:
      renderContent = <CellModal data={data}/>
      break
  }

  return (
    <div>
      <Dialog open={open} onClose={() => modalHandler()} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-14">
          <Dialog.Panel className="mx-auto max-w-xl w-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100  rounded-lg shadow-xl max-h-400">
            <div className="flex justify-between items-center p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
              <div>
                {/* {(!isEditing && isEditing != null && <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>)} */}
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
