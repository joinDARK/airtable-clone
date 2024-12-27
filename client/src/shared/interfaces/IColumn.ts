import { ColumnType } from "../types/ColumnType";

export default interface IColumn {
  key: string;
  label: string;
  sortable: boolean;
  type: ColumnType;
  readonly: boolean;
}