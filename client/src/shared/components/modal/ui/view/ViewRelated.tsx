import IRelatedData from "@interfaces/IRelatedData";
import getRelatedData from "@services/relationship/getRelatedData";
import { TableKey } from "@shared_types/TableKey";
import { useModalStore } from "@store/useModalStore";

interface Props {
  view?: IRelatedData[];
  colKey?: TableKey;
  table?: TableKey
}

export default function ViewRelated({view, colKey, table}: Props) {
  const { pushScreen, goForward } = useModalStore()

  return (
    <div className="border rounded-md p-2 flex gap-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      {
        view?.length
          ? view.map((item, i) => (
            <div 
              key={i} 
              className="px-6 py-1 rounded-xl transition-all bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 hover:text-gray-600"
              onClick={async () => {
                if (colKey && table) {
                  const res = await getRelatedData(table, colKey, item)
                  pushScreen({screenType: colKey, screenData: res, title: item.name ?? String(item.id), isEdit: false})
                  goForward()
                } else {
                  console.log(colKey, table)
                }
              }}
            >{item.name ?? item.id}</div>
          ))
          : "—"
      }
    </div>
  )
}