import { ScreenType } from "@shared_types/ScreenType";
import { FileType } from "@shared_types/FileType";


export default interface IModalScreen {
  screenType: ScreenType; // Тип экрана модального окна
  screenData: any | null; // Данные этого модального окна
  title: string; // Загаловок модального окна
  isEdit: boolean; // В режиме редактирование или нет
  screenFileType?: string; // В режиме редактирование или нет
  readonly?: boolean; // Только для чтения или может редактироваться
}