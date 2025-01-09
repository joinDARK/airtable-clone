import { transformDate } from "@services/date_formateer/dateFormateer";

interface Props {
  view?: string;
}

export default function ViewDate({view}: Props) {
  return (
    <div className="border rounded-md p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">{view ? transformDate(view) : "—"}</div>
  )
}