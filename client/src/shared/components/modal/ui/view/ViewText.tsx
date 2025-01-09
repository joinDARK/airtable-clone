interface Props {
  view?: string;
}

export default function ViewText({view}: Props) {
  return (
    <div className="border rounded-md p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">{view ? view : "—"}</div>
  )
}