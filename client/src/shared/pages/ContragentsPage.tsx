import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useLoaderStore from '../store/useLoaderStore'
import { useGet } from '../../modules/graphql'
import { useEffect } from 'react'
import useTableStore from '../store/useTableStore'
import { z } from "zod"
import { ResContragentSchema } from "../schema/response.ts"
import { TableKey } from "../types/TableKey.ts"

function ContragentsPage() {
  const type: TableKey = 'contragents'
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading } = useGet(type)

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