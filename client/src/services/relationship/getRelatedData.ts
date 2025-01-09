import { queryClient } from "@services/api/queryClient";
import { client, queries } from "@services/graphql";
import { TableKey } from "@shared_types/TableKey";
import relationshipConfig from "./config";
import IRelatedData from "@interfaces/IRelatedData";

export default async function getRelatedData(table: TableKey, uniqueKey: string, relatedData: IRelatedData) {
  let cashedData;
  let relationshipKey;

  if (uniqueKey == "review_table") relationshipKey = "orders"
  else if (uniqueKey == "reviewers") relationshipKey = "managers"
  else relationshipKey = uniqueKey

  cashedData = queryClient.getQueryData([uniqueKey])
  const queryKey: any = relationshipConfig[table][relationshipKey];

  if (!cashedData) {
    const { data } = await client.query({query: queries[queryKey]})
    cashedData = data.uniqueKey
    queryClient.setQueryData([uniqueKey], cashedData)
  }

  return cashedData.find((item: any) => item.id === relatedData.id)
}