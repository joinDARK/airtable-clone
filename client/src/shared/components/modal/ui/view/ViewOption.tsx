import Option from "@components/table/ui/type-cell/Option";

interface Props {
  view?: string;
}

export default function ViewOption({view}: Props) {
  return (
    <div className="border rounded-md p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">{view ? <Option value={view}/> : "—"}</div>
  )
}