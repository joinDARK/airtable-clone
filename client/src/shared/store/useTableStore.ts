import { create } from "zustand"
import { Table } from "../types/Table";

interface ITableStore {
  data: Table[];
  setData: (newData: Table[]) => void;
}
const useTableStore = create<ITableStore>((set) => ({
  data: [],
  setData: (newData: Table[]) => set({
    data: newData
  })
}))

export default useTableStore