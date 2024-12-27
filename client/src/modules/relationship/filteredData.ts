import IRelatedData from "../../shared/interfaces/IRelatedData";
import { Table } from "../../shared/types/Table";

export default function filteredData(data: Table[]): IRelatedData[] {
  const filteredData: IRelatedData[] = data
    .map((item) => {
      if ("name" in item) {
        return { id: item.id, name: item.name }
      } else {
        return { id: item.id }
      }
    })
  return filteredData
}