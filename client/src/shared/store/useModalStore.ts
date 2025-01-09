import {create} from "zustand"
import IModalScreen from "@interfaces/IModalScreen";

interface ModalStore {
  isOpen: boolean; // Состояние модального окна
  screensStack: IModalScreen[]; // Стек экранов модального окна
  currentIndex: number; // Индекс текущего открытого модального окна
  
  openModal: (initScreen: IModalScreen) => void; // Открытие модального окна. Принимает первоначальное окно
  pushScreen: (screen: IModalScreen) => void; // Добавление окна в стек
  goBack: () => void; // Возвращает на предыдущее окно
  goForward: () => void; // Возвращает на следующее окно
  closeModal: () => void; // Закрывает модальное окно
}

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  screensStack: [],
  currentIndex: -1,

  openModal: (initialScreen) => set({ // 
    screensStack: [initialScreen],
    currentIndex: 0,
    isOpen: true
  }),

  pushScreen: (screen) => {
    // Если хотим позволить перемещение вперёд/назад, 
    // то при pushScreen нужно обрезать «хвост» после currentIndex,
    // чтобы мы не застряли в «ветке» истории.
    const { screensStack, currentIndex } = get();

    // Обрезаем хвост (если пользователь вдруг был не на верхнем экране)
    const newStack = screensStack.slice(0, currentIndex + 1);

    // Добавляем новый экран
    newStack.push(screen);

    set({
      screensStack: newStack,
      currentIndex: newStack.length - 1,
      isOpen: true
    });
  },

  goBack: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  goForward: () => {
    const { currentIndex, screensStack } = get();
    if (currentIndex < screensStack.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  closeModal: () => set({ // Также сбрасывает все значения
    screensStack: [],
    currentIndex: -1,
    isOpen: false,
  }),
}))