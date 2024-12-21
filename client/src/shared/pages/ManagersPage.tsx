import { useEffect } from "react"
import TableLayout from "../components/table/TableLayout.tsx"
import useTableStore from "../components/table/store/useTableStore.ts"
import { Modal } from "../components/modal/Modal.tsx"

function ManagersPage() {
  const setTableData = useTableStore((store) => store.setData)
  
  return (
    <>
      <TableLayout type="managers" />
      <Modal/>
    </>
  )
}

export default ManagersPage