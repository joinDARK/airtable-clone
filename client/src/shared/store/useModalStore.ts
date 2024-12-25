import {create} from "zustand"
import { ITable } from "../types/index";

interface ModalStore {
  open: boolean;
  title: string | number;
  content?: string;
  data?: string;
  formData?: ITable;
  modalHandler: (newTitle?: string | number, newContent?: string, newData?: string, newFormData?: ITable ) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  open: false,
  title: "",
  content: "",
  data: "",
  formData: {},
  modalHandler: (newTitle?: string | number, newContent: string = "", newData: string = "", newFormData: ITable = {}) => set(() => ({
    open: !get().open,
    content: newContent,
    data: newData,
    formData: newFormData,
    title: newTitle ?? "Нету загаловка"
  }))
}))