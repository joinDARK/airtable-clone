import ViewRelated from "./ViewRelated";
import ViewText from "./ViewText";
import IOrder from "@interfaces/table/IOrder";

interface Props {
  view?: IOrder;
}

export default function ViewOrder({view}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p>ID:</p>
        <div className="text-xs">
          <ViewText view={String(view?.id)}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>Менеджеры:</p>
        <div className="text-xs">
          <ViewRelated view={view?.managers} table="orders" colKey="managers" />
        </div>
      </div>
    </div>
  )
}