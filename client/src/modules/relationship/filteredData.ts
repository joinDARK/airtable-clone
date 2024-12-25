import { IRelatedData } from "../../shared/types";

export default function filteredData(data: [], relationshipID: IRelatedData[]) {
  if (relationshipID === undefined || relationshipID.length === 0) {
    return data
  } else {
    const relationshipIDs = relationshipID.map(item => item.id);
    const filteredData = data.filter((item: { id: number }) => relationshipIDs.includes(item.id));
    return filteredData;
  }
}