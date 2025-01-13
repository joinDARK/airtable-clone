import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";
import ISubagent from "@interfaces/table/ISubagent";

interface Props {
  view?: ISubagent;
}

export default function ViewSubagent({view}: Props) {
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
          <ViewRelated view={view?.orders} table="subagents" colKey="orders"/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Плательщики субагента</p>
        <div className="text-xs">
          <ViewRelated view={view?.subagentPayers} table="subagents" colKey="subagentPayers"/>
        </div>
      </div>
    </div>
  )
}