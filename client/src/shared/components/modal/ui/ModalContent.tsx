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
import { ViewFileList } from "@components/file/ViewFileList";
import { 
  EditManager, 
  EditSubagentPayer, 
  EditSubagent, 
  EditCountry,
  EditClient,
  EditAgent,
  EditContragent,
  EditText,
  EditDate,
  EditNumber,
  EditOption
} from "./edit";
import UploadFiles from "@components/file/File";

interface Props {
  screen: IModalScreen;
  updVal: (newData: any) => Promise<void>;
}

export default function ModalContent({ screen, updVal }: Props) {
  const { screenType, screenData, isEdit, screenFileType } = screen;
  const { relatedSettings } = useModalStore();

  console.log(screenData)

  switch (screenType) {
    case "files":
      return isEdit ? (
        <UploadFiles
          data={screenData.data}
          orderId={screenData.id}
          typeCell={screenFileType ?? ""}
        />
      ) : (
        <ViewFileList serverFiles={screenData.data} />
      );
    case "text":
      return isEdit ? <EditText val={screenData} onSubmit={updVal}/> : <ViewText view={screenData.data} />;
    case "date":
      return isEdit ? <EditDate val={screenData} onSubmit={updVal}/> : <ViewDate view={screenData.data} />;
    case "number":
      return isEdit ? <EditNumber val={screenData} onSubmit={updVal}/> : <ViewText view={String(screenData.data)} />;
    case "option":
      return isEdit ? <EditOption val={screenData} onSubmit={updVal}/> : <ViewOption view={screenData.data} />;
    case "related":
      return isEdit ? (
        "Пока ничего"
      ) : (
        <ViewRelated
          view={screenData.data}
          colKey={relatedSettings.relatedKey ?? undefined}
          table={relatedSettings.table ?? undefined}
        />
      );
    case "orders":
      return isEdit ? "Пока ничего" : <ViewOrder view={screenData} />;
    case "managers":
      return isEdit ? <EditManager data={screenData} /> : <ViewManager view={screenData} />;
    case "agents":
      return isEdit ? <EditAgent data={screenData} /> : <ViewAgent view={screenData} />;
    case "contragents":
    return isEdit ? <EditContragent data={screenData} /> : <ViewContragent view={screenData}/>;
    case "clients":
      return isEdit ? <EditClient data={screenData} /> : <ViewClient view={screenData}/>;
    case "countries":
      return isEdit ? <EditCountry data={screenData} /> : <ViewCountry view={screenData}/>;
    case "subagents":
      return isEdit ? <EditSubagent data={screenData} /> : <ViewSubagent view={screenData} />;
    case "subagentPayers":
      return isEdit ? <EditSubagentPayer data={screenData} /> : <ViewSubagentPayer view={screenData} />
    default:
      return <div className="text-red-500">Новый или неизвестный тип</div>;
  }
}
