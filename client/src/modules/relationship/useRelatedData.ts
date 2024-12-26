import { useGet } from "../graphql";
import relationshipConfig from "./config";
import { TableKey } from "../../shared/types/TableKey";
import filteredData from "./filteredData";

export default function useRelatedData(table: TableKey, relationship: TableKey) {
  const { data } = useGet(relationshipConfig[table][relationship]);

  return filteredData(data[relationship]);
}