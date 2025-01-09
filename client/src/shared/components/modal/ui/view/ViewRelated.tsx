import IRelatedData from "@interfaces/IRelatedData";

interface Props {
  view?: IRelatedData[];
}

export default function ViewRelated({view}: Props) {
  return (
    <div className="border rounded-md p-2 flex gap-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      {
        view?.length
          ? view.map((item, i) => (
            <div key={i} className="px-6 py-1 rounded-xl bg-gray-200 dark:bg-gray-800">{item.name ?? item.id}</div>
          ))
          : "—"
      }
    </div>
  )
}