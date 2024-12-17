import {create} from "zustand"

interface ModalStore {
  open: boolean;
  title: string | number;
  modalHandler: (newTitle?: string | number) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  title: "",
  modalHandler: (newTitle?: string | number) => set((state) => ({
    open: !state.open,
    title: newTitle ?? "Нету загаловка"
  }))
}))