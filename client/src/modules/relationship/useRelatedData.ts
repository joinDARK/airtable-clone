import { useGet } from "../graphql";
import relationshipConfig from "./config";
import { IRelatedData, ITableNames } from "../../shared/types";
import filteredData from "./filteredData";

export default function useRelatedData(table: ITableNames, relationship: ITableNames, relationshipID: IRelatedData[]) {
  const { data } = useGet(relationshipConfig[table][relationship]);

  return filteredData(data[relationship], relationshipID);
}