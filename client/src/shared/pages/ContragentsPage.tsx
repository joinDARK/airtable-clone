import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useLoaderStore from '../store/useLoaderStore'
import { useEffect } from 'react'
import useTableStore from '../store/useTableStore'
import { z } from "zod"
import { ResContragentSchema } from "../schema/response.ts"
import { TableKey } from "../types/TableKey.ts"
import { useQuery } from 'react-query'
import { client, queries } from '../../modules/graphql/index'

function ContragentsPage() {
  const type: TableKey = 'contragents'
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
        const validatedData = z.array(ResContragentSchema).parse(data[type])
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

export default ContragentsPage