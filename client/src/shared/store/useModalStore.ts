import {create} from "zustand"
import ITable from "@interfaces/ITable";
import { TableKey } from "@shared_types/TableKey";

interface ModalStore {
  open: boolean;
  title: string | number;
  content?: string;
  data?: string | number;
  isEdit?: boolean;
  formData?: ITable;
  table: TableKey;
  setModalData: (newTitle?: string | number, newContent?: string, newData?: string | number, newFormData?: ITable ) => void;
  setTable: (newTable: TableKey) => void;
  modalHandler: () => void;
  setIsEdit: (state: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  title: "",
  content: "",
  data: "",
  table: "orders",
  formData: {},
  isEdit: false,
  modalHandler: () => set((store) => ({
    open: !store.open
  })),
  setModalData: (newTitle: string | number = "", newContent: string = "", newData: string | number = "", newFormData: ITable = {}) => set(() => ({
    content: newContent,
    data: newData, // Возоможно могут возникунть проблемы
    formData: newFormData,
    title: newTitle ?? "Нету загаловка"
  })),
  setTable: (newTable: TableKey) => set(() => ({
    table: newTable
  })),
  setIsEdit: (state: boolean) => set(() => ({
    isEdit: state
  })),
}))