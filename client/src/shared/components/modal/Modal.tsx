import Line from "@components/Line";
import { Dialog } from "@headlessui/react";
import { useModalStore } from "@store/useModalStore";
import clsx from "clsx";
import { X, Edit, Eye, ChevronLeft, ChevronRight, SquareGantt } from "lucide-react";
import ModalContent from "./ui/ModalContent";

export const Modal = () => {
  const {
    isOpen,
    screensStack,
    currentIndex,
    goBack,
    goForward,
    closeModal,
    pushScreen,
  } = useModalStore();

  const currentScreen = screensStack[currentIndex] || null; // Текущий экран
  const canGoBack = currentIndex > 0; // Можем ли переключить экран вперед
  const canGoForward = currentIndex < screensStack.length - 1; // Можем ли переключить экран назад

  if (!isOpen || !currentScreen) return null;

  const { isEdit } = currentScreen;

  return (
    <div>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-14">
          <Dialog.Panel className="mx-auto max-w-xl w-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100  rounded-lg shadow-xl max-h-[40rem]">
            <div className="flex justify-between items-center p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">
                {isEdit ? `Изменить ${currentScreen.title}` : `Подробнее ${currentScreen.title}`}
              </Dialog.Title>
              <div className="flex">
                <button
                  title="debug"
                  onClick={() => {
                    console.log(currentScreen)
                  }}
                >
                  <Eye size={20}/>
                </button>
                <button
                  className={clsx(
                    "p-1 text-gray-500 transition-all mr-0.5",
                    currentScreen.isEdit ? "hover:text-orange-500" : "hover:text-blue-500"
                  )}
                  onClick={() => {
                    pushScreen({...currentScreen, isEdit: !currentScreen.isEdit})
                    goForward()
                  }}
                  disabled={currentScreen.readonly}
                >
                  {currentScreen.isEdit ? <Edit size={18} /> : <SquareGantt size={18}/>}
                </button>
                <Line horizontal/>
                <div className="flex gap-1 mx-1">
                  <button
                    title="Прошлое окно"
                    type="button"
                    onClick={goBack}
                    disabled={!canGoBack}
                    className={clsx(
                      "hover:bg-gray-100 hover:dark:bg-gray-600 transition-all duration-200 rounded-full",
                      canGoBack ? "" : "text-gray-300/70 dark:text-gray-100/30"
                    )}
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <button
                    title="Следующее окно"
                    type="button"
                    onClick={goForward}
                    disabled={!canGoForward}
                    className={clsx(
                      "hover:bg-gray-100 hover:dark:bg-gray-600 transition-all duration-200 rounded-full",
                      canGoForward ? "" : "text-gray-300/70 dark:text-gray-100/30"
                    )}
                  >
                    <ChevronRight size={20}/>
                  </button>
                </div>
                <Line horizontal/>
                <button
                  title="Закрыть"
                  type="button"
                  className="p-1 hover:bg-gray-100 hover:dark:bg-gray-600 transition-all duration-200 rounded-full ml-0.5"
                  onClick={closeModal}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-scroll p-4 resize-y">
              <ModalContent screen={currentScreen}/>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
