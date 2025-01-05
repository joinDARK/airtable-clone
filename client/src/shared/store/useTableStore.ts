import { create } from "zustand"
import { Table } from "@shared_types/Table";

interface ITableStore {
  data: Table[];
  refetchTable: () => void;
  setData: (newData: Table[]) => void;
  setRefetchTable: (refetch: () => void) => void;
}
const useTableStore = create<ITableStore>((set) => ({
  data: [],
  refetchTable: () => {},
  setData: (newData: Table[]) => set({
    data: newData
  }),
  setRefetchTable: (refetch: () => void) => set({
    refetchTable: refetch
  })
}))

export default useTableStore