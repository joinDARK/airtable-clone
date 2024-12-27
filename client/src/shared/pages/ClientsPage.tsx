import { Modal } from "../components/modal/Modal"
import TableLayout from "../components/table/TableLayout"
import { useEffect } from "react"
import useLoaderStore from "../store/useLoaderStore"
import useTableStore from "../store/useTableStore"
import { z } from "zod"
import { ResClientSchema } from "../schema/response"
import { TableKey } from "../types/TableKey"
import { useQuery } from 'react-query'
import { client, queries } from '../../modules/graphql/index'

function ClientsPage() {
  const type: TableKey = "clients"
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const { data, isLoading } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResClientSchema).parse(data[type])
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

export default ClientsPage