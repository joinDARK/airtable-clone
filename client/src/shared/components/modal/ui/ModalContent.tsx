import IModalScreen from "@interfaces/IModalScreen";
import {
  ViewText,
  ViewDate,
  ViewOption,
  ViewRelated,
  ViewManager,
  ViewOrder,
  ViewSubagentPayer,
  ViewSubagent,
  ViewCountry,
  ViewClient,
  ViewAgent,
  ViewContragent
} from "./view";
import { useModalStore } from "@store/useModalStore";
import { ServerFileList } from "@components/file/ServerFileList";
import { 
  EditManager, 
  EditSubagentPayer, 
  EditSubagent, 
  EditCountry,
  EditClient,
  EditAgent,
  EditContragent
} from "./edit";
import UploadFiles from "@components/file/File";

interface Props {
  screen: IModalScreen;
  submit: (newData: any) => Promise<void>
}

export default function ModalContent({ screen, submit }: Props) {
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
    case "orders":
      return isEdit ? "Пока ничего" : <ViewOrder view={screenData} />;
    case "managers":
      return isEdit ? <EditManager data={screenData} onSubmit={submit}/> : <ViewManager view={screenData} />;
    case "agents":
      return isEdit ? <EditAgent data={screenData} onSubmit={submit}/> : <ViewAgent view={screenData} />;
    case "contragents":
    return isEdit ? <EditContragent data={screenData} onSubmit={submit}/> : <ViewContragent view={screenData}/>;
    case "clients":
      return isEdit ? <EditClient data={screenData} onSubmit={submit}/> : <ViewClient view={screenData}/>;
    case "countries":
      return isEdit ? <EditCountry data={screenData} onSubmit={submit}/> : <ViewCountry view={screenData}/>;
    case "subagents":
      return isEdit ? <EditSubagent data={screenData} onSubmit={submit}/> : <ViewSubagent view={screenData} />;
    case "subagentPayers":
      return isEdit ? <EditSubagentPayer data={screenData} onSubmit={submit}/> : <ViewSubagentPayer view={screenData} />
    default:
      return <div className="text-red-500">Новый или неизвестный тип</div>;
  }
}
