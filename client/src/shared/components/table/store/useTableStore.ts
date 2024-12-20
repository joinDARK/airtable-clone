import { create } from "zustand"
import { IAgent, IClient, IContragent, ICountry, IManager, IOrder, ISubagent, ISubagentPayer } from "../../../types"

type Data = (IOrder | IClient | IManager | ISubagent | ISubagentPayer | IAgent | IContragent | ICountry | object | never)[]

interface ITableStore {
  data: Data;
  setData: (newData: Data) => void;
}
const useTableStore = create<ITableStore>((set) => ({
  data: [],
  setData: (newData: Data) => set({
    data: newData
  })
}))

export default useTableStore