import { TableKey } from "@shared_types/TableKey";
import { ColumnType } from "@shared_types/ColumnType";

export default interface IModalScreen {
  screenType: TableKey | ColumnType; // Тип экрана модального окна
  screenData: any | null; // Данные этого модального окна
  title: string; // Загаловок модального окна
  isEdit: boolean; // В режиме редактирование или нет
  readonly?: boolean; // Только для чтения или может редактироваться
}