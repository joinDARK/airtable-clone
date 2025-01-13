import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";
import ICountry from "@interfaces/table/ICountry";

interface Props {
  view?: ICountry;
}

export default function ViewCountry({view}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p>Краткое название:</p>
        <div className="text-xs">
          <ViewText view={view?.name}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Код:</p>
        <div className="text-xs">
          <ViewText view={view?.code}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Полное наименование:</p>
        <div className="text-xs">
          <ViewText view={view?.full_name}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Заявки</p>
        <div className="text-xs">
          <ViewRelated view={view?.orders} table="countries" colKey="orders"/>
        </div>
      </div>
    </div>
  )
}