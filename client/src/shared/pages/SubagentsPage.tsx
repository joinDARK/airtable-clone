import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useTableStore from '../store/useTableStore'
import { useGet } from '../../modules/graphql'
import { useEffect } from 'react'
import useLoaderStore from '../store/useLoaderStore'
import { ResSubagentSchema } from '../schema/response'
import { z } from 'zod'
import { TableKey } from "../types/TableKey"

function SubagentsPage() {
  const type: TableKey = 'subagents'
  const setTableData = useTableStore(store => store.setData)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)
  const { data, isLoading } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true)
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResSubagentSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error('Validation error:', error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData])

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default SubagentsPage