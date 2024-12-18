interface Props {
  data?: string
}

function CellModal({data}: Props) {
  return (
    <div className="text-red-400">{typeof data === "string" ? data : "—"}</div>
  )
}

export default CellModal