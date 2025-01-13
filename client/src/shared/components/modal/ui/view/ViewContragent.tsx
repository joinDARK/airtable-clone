import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";
import IContragent from "@interfaces/table/IContragent";

interface Props {
  view?: IContragent;
}

export default function ViewContragent({view}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p>Наименование:</p>
        <div className="text-xs">
          <ViewText view={view?.name}/>
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