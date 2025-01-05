import { useQuery } from 'react-query';
import { client, queries } from "@services/graphql";
import { TableKey } from "@shared_types/TableKey";

// Локальный импорт
import filteredData from "./filteredData";
import relationshipConfig from "./config";

export default function useRelatedData(table: TableKey, relationship: TableKey) {
  const queryKey = relationshipConfig[table][relationship];
  const { data } = useQuery(queryKey, async () => {
    const { data } = await client.query({ query: queries[queryKey] });
    return data;
  });

  return filteredData(data ? data[relationship] : []);
}