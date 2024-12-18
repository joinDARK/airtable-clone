import {create} from "zustand"

interface ModalStore {
  open: boolean;
  title: string | number;
  content?: string;
  data?: string;
  modalHandler: (newTitle?: string | number, newContent?: string, newData?: string) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  open: false,
  title: "",
  content: "",
  data: "",
  modalHandler: (newTitle?: string | number, newContent: string = "", newData: string = "") => set(() => ({
    open: !get().open,
    content: newContent,
    data: newData,
    title: newTitle ?? "Нету загаловка"
  }))
}))