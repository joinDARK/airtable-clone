import { queryClient } from "@services/api/queryClient";
import { client, queries } from "@services/graphql";
import { TableKey } from "@shared_types/TableKey";
import relationshipConfig from "./config";
import IRelatedData from "@interfaces/IRelatedData";
import transformColumnKey from "./transformColumnKey";

export default async function getRelatedData(table: TableKey, uniqueKey: string, relatedData: IRelatedData) {
  let cashedData;
  const relationshipKey = transformColumnKey(uniqueKey);

  cashedData = queryClient.getQueryData([relationshipKey])
  const queryKey: any = relationshipConfig[table][relationshipKey];

  if (!cashedData) {
    const { data } = await client.query({query: queries[queryKey]})
    cashedData = data.relationshipKey
    queryClient.setQueryData([relationshipKey], cashedData)
  }
  

  return cashedData[relationshipKey].find((item: any) => item.id === relatedData.id)
}