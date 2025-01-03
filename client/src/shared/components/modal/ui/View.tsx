import { useModalStore } from "../../../store/useModalStore"
import configs from "../../../configs"
import IColumn from "../../../interfaces/IColumn";
import { transformDate } from "../../../../modules/date_formateer/dateFormateer"

const renderData = (data: any, config: IColumn[]) => {
  if (Array.isArray(data) && data.length === 0) {
    return <div>—</div>;
  }
  if (typeof data === 'object' && data !== null) {
    return (
      <div className="flex flex-col gap-3">
        {Object.entries(data).map(([key, value]) => { 
          if (key === "id") return null;
          const column = config.find(col => col.key === key);
          const displayKey = column ? column.label : key;
          return (
            <div key={key} className="flex items-center gap-2">
              <strong>{displayKey}:</strong> {renderData(value, config)}
            </div>
          )
        })}
      </div>
    );
  }
  return <div className="dark:bg-gray-700 border rounded-md dark:border-gray-600 p-2 text-xs">{transformDate(String(data))}</div>;
};

export default function View() {
  const view = useModalStore(store => store.formData)
  const configKey = useModalStore(store => store.content)
  const config = configs[configKey].columns || {};

  return (
    <>
      <div>{renderData(view, config)}</div>
    </>
  )
}