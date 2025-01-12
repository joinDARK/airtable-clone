import IModalScreen from "@interfaces/IModalScreen";
import {
  ViewText,
  ViewDate,
  ViewOption,
  ViewRelated,
  ViewManager,
  ViewOrder,
} from "./view";
import { useModalStore } from "@store/useModalStore";
import { ServerFileList } from "@components/file/ServerFileList";
import UploadFiles from "@components/file/File";

interface Props {
  screen: IModalScreen;
}

export default function ModalContent({ screen }: Props) {
  const { screenType, screenData, isEdit, screenFileType } = screen;
  const { relatedSettings } = useModalStore();

  switch (screenType) {
    case "files":
      return isEdit ? (
        <UploadFiles
          data={screenData}
          orderId={2} // todo
          typeCell={screenFileType ?? ""}
        />
      ) : (
        <ServerFileList serverFiles={screenData} />
      );
    case "text":
      return isEdit ? "Пока ничего" : <ViewText view={screenData} />;
    case "date":
      return isEdit ? "Пока ничего" : <ViewDate view={screenData} />;
    case "number":
      return isEdit ? "Пока ничего" : <ViewText view={String(screenData)} />;
    case "option":
      return isEdit ? "Пока ничего" : <ViewOption view={screenData} />;
    case "related":
      return isEdit ? (
        "Пока ничего"
      ) : (
        <ViewRelated
          view={screenData}
          colKey={relatedSettings.relatedKey ?? undefined}
          table={relatedSettings.table ?? undefined}
        />
      );
    case "managers":
      return isEdit ? "Пока ничего" : <ViewManager view={screenData} />;
    case "orders":
      return isEdit ? "Пока ничего" : <ViewOrder view={screenData} />;
    default:
      return <div className="text-red-500">Новый или неизвестный тип</div>;
  }
}
