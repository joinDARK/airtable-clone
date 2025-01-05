import IColumn from "@interfaces/IColumn";
import { ColumnType } from "@shared_types/ColumnType";

export default class Column implements IColumn {
  key: string;
  label: string;
  sortable: boolean;
  type: ColumnType;
  readonly: boolean;

  constructor(
    key: string, 
    label: string, 
    sortable: boolean = false, 
    type: ColumnType, 
    readonly: boolean = false
  ) {
    this.key = key;
    this.label = label;
    this.sortable = sortable;
    this.type = type;
    this.readonly = readonly;
  }
}