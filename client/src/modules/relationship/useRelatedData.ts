import { useQuery } from 'react-query';
import { client, queries } from "../graphql";
import relationshipConfig from "./config";
import { TableKey } from "../../shared/types/TableKey";
import filteredData from "./filteredData";

export default function useRelatedData(table: TableKey, relationship: TableKey) {
  const queryKey = relationshipConfig[table][relationship];
  const { data } = useQuery(queryKey, async () => {
    const { data } = await client.query({ query: queries[queryKey] });
    return data;
  });

  return filteredData(data ? data[relationship] : []);
}