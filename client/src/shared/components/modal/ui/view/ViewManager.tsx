import IManager from "@interfaces/table/IManager";
import ViewDate from "./ViewDate";
import ViewText from "./ViewText";
import ViewRelated from "./ViewRelated";

interface Props {
  view?: IManager;
}

export default function ViewManager({view}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p>Имя:</p>
        <div className="text-xs">
          <ViewText view={view?.name}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Номер телефона:</p>
        <div className="text-xs">
          <ViewText view={view?.tel}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>День рождения:</p>
        <div className="text-xs">
          <ViewDate view={view?.date}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Заявки</p>
        <div className="text-xs">
          <ViewRelated view={view?.orders} table="managers" colKey="orders"/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Проверяю</p>
        <div className="text-xs">
          <ViewRelated view={view?.review_table} table="managers" colKey="orders"/>
        </div>
      </div>
    </div>
  )
}