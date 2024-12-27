import { TableKey } from '../types/TableKey';
import IColumn from './IColumn';

export default interface ITableConfig {
  names: string;
  key: TableKey;
  columns: IColumn[];
  title: string;
}