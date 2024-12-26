import IColumn from '../interfaces/IColumn';
import ITableConfig from '../interfaces/ITableConfig';
import { TableKey } from '../types/TableKey';

export default class TableConfig implements ITableConfig {
  names: string;
  key: TableKey;
  columns: IColumn[];
  title: string;

  constructor(names: string, key: TableKey, columns: IColumn[], title: string) {
    this.names = names;
    this.key = key;
    this.columns = columns;
    this.title = title;
  }
}