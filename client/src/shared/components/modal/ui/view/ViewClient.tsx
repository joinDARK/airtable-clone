import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";
import IClient from "@interfaces/table/IClient";

interface Props {
  view?: IClient;
}

export default function ViewClient({view}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p>Наименование:</p>
        <div className="text-xs">
          <ViewText view={view?.name}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>ИНН:</p>
        <div className="text-xs">
          <ViewText view={view?.inn}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Заявки</p>
        <div className="text-xs">
          <ViewRelated view={view?.orders} table="clients" colKey="orders"/>
        </div>
      </div>
    </div>
  )
}