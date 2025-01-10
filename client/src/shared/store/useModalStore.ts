import {create} from "zustand"
import ITable from "@interfaces/ITable";

interface ModalStore {
  open: boolean;
  title: string | number;
  content?: string;
  data?: string | number;
  isEdit?: boolean;
  formData?: any;
  setModalData: (newTitle?: string | number, newContent?: string, newData?: string | number, newFormData?: ITable ) => void;
  modalHandler: () => void;
  setIsEdit: (state: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  title: "",
  content: "",
  data: "",
  formData: {},
  isEdit: false,
  modalHandler: () => set((store) => ({
    open: !store.open
  })),
  setModalData: (newTitle: string | number = "", newContent: string = "", newData: string | number = "", newFormData: any = {}) => set(() => ({
    content: newContent,
    data: newData, // Возоможно могут возникунть проблемы
    formData: newFormData,
    title: newTitle ?? "Нету загаловка"
  })),
  setIsEdit: (state: boolean) => set(() => ({
    isEdit: state
  }))
}))