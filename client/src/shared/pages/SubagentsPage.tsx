import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useTableStore from '../store/useTableStore'
import { useEffect } from 'react'
import useLoaderStore from '../store/useLoaderStore'
import { ResSubagentSchema } from '../schema/response'
import { z } from 'zod'
import { TableKey } from "../types/TableKey"
import { useQuery } from 'react-query'
import { client } from '../../modules/graphql'
import { queries } from '../../modules/graphql'

function SubagentsPage() {
  const type: TableKey = 'subagents'
  const setTableData = useTableStore(store => store.setData)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const { data, isLoading } = useQuery('subagents', async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true)
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResSubagentSchema).parse(data[type])
        console.log(validatedData)
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