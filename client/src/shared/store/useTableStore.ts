import { create } from "zustand"
import { Table } from "@shared_types/Table";

interface ITableStore {
  data: Table[];
  refetchTable: () => void;
  forceRefetchTable: () => void;

  setData: (newData: Table[]) => void;
  setRefetchTable: (refetch: () => void) => void;
  setForceRefetchTable: (refetch: () => void) => void;
}
const useTableStore = create<ITableStore>((set) => ({
  data: [],
  refetchTable: () => {},
  forceRefetchTable: () => {},

  setData: (newData: Table[]) => set({
    data: newData
  }),
  setRefetchTable: (refetch: () => void) => set({
    refetchTable: refetch
  }),
  setForceRefetchTable: (refetch: () => void) => set({
    forceRefetchTable: refetch
  }),
}))

export default useTableStore