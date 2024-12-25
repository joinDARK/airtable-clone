import { useGraphQL } from "../graphql/useGraphQL";
import relationshipConfig from "./config";
import { IRelatedData, ITableNames } from "../../shared/types";
import filteredData from "./filteredData";

export default function useRelatedData(table: ITableNames, relationship: ITableNames, relationshipID: IRelatedData[]) {
  const { data } = useGraphQL(relationshipConfig[table][relationship]);

  return filteredData(data[relationship], relationshipID);
}