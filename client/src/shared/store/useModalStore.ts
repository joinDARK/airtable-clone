import {create} from "zustand"
import ITable from "../interfaces/ITable";

interface ModalStore {
  open: boolean;
  title: string | number;
  content?: string;
  data?: string | number;
  formData?: ITable;
  setModalData: (newTitle?: string | number, newContent?: string, newData?: string | number, newFormData?: ITable ) => void
  modalHandler: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  title: "",
  content: "",
  data: "",
  formData: {},
  modalHandler: () => set((store) => ({
    open: !store.open
  })),
  setModalData: (newTitle: string | number = "", newContent: string = "", newData: string | number = "", newFormData: ITable = {}) => set(() => ({
    content: newContent,
    data: newData, // Возоможно могут возникунть проблемы
    formData: newFormData,
    title: newTitle ?? "Нету загаловка"
  }))
}))