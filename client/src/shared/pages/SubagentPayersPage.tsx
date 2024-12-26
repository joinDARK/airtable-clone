import TableLayout from "../components/table/TableLayout"
import { Modal } from "../components/modal/Modal"
import useTableStore from "../store/useTableStore"
import useLoaderStore from "../store/useLoaderStore"
import { useGet } from "../../modules/graphql"
import { useEffect } from "react"
import { TableKey } from "../types/TableKey"
import { z } from "zod"
import { ResSubagentPayerSchema } from "../schema/response"

function SubagentPayersPage() {
  const type: TableKey = "subagentPayers"
  const setTableData = useTableStore(store => store.setData)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)
  const { data, isLoading } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false);
      try {
        const validatedData = z.array(ResSubagentPayerSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error('Ошибка валидации страницы:', error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData]);

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default SubagentPayersPage