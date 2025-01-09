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
    </div>
  )
}