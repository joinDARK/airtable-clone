import {create} from "zustand"

interface ModalStore {
  open: boolean;
  title: string;
  modalHandler: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  title: "",
  modalHandler: () => set((state) => ({open: !state.open}))
}))