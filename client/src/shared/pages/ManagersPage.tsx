import TableLayout from "../components/table/TableLayout.tsx"
import useTableStore from "../store/useTableStore.ts"
import { Modal } from "../components/modal/Modal.tsx"
import useLoaderStore from "../store/useLoaderStore.ts"
import { useGet } from "../../modules/graphql/index.ts"
import { useEffect } from "react"
import { z } from "zod"
import { ResManagerSchema } from "../schema/response.ts"
import { TableKey } from "../types/TableKey.ts"

function ManagersPage() {
  const type: TableKey = "managers"
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true)
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResManagerSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error('Validation error:', error)
      }
    }
  }, [handlerLoader, setTableData, type, isLoading])

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default ManagersPage