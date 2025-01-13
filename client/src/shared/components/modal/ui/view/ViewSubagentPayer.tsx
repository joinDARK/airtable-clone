import ISubagentPayer from "@interfaces/table/ISubagentPayer";
import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";

interface Props {
  view?: ISubagentPayer;
}

export default function ViewSubagentPayer({view}: Props) {
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
          <ViewRelated view={view?.orders} table="subagentPayers" colKey="orders"/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Субагенты</p>
        <div className="text-xs">
          <ViewRelated view={view?.subagents} table="subagentPayers" colKey="subagents"/>
        </div>
      </div>
    </div>
  )
}