import { useEffect } from "react"
import TableLayout from "../../components/table/TableLayout.tsx"
import useTableStore from "../../components/table/store/useTableStore.ts"
import { testManager } from "../../../test_data/data.ts"
import { Modal } from "../../components/modal/Modal.tsx"

function ManagersPage() {
  const setTableData = useTableStore((store) => store.setData)

  useEffect(() => { // Типо выполняем запрос
    setTableData(testManager)
  })
  
  return (
    <>
      <TableLayout type="managers" />
      <Modal/>
    </>
  )
}

export default ManagersPage