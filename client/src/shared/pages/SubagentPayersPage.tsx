import TableLayout from "../components/table/TableLayout"
import { Modal } from "../components/modal/Modal"
import useTableStore from "../store/useTableStore"
import useLoaderStore from "../store/useLoaderStore"
import { useEffect } from "react"
import { TableKey } from "../types/TableKey"
import { z } from "zod"
import { ResSubagentPayerSchema } from "../schema/response"
import { useQuery } from 'react-query'
import { client, queries } from '../../modules/graphql/index'

function SubagentPayersPage() {
  const type: TableKey = "subagentPayers"
  const setTableData = useTableStore(store => store.setData)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const { data, isLoading } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

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