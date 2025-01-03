import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useTableStore from '../store/useTableStore'
import { useEffect } from 'react'
import useLoaderStore from '../store/useLoaderStore'
import { ResSubagentSchema } from '../schema/response'
import { z } from 'zod'
import { TableKey } from "../types/TableKey"
import { useQuery } from 'react-query'
import { client, queries, mutation } from '../../modules/graphql'
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"
import ISubagent from '../interfaces/table/ISubagent'

function SubagentsPage() {
  const type: TableKey = 'subagents'
  const setTableData = useTableStore(store => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const [deleteSubagent] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true,
  })

  const [createSubagent] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true,
  })

  const [updateSubagent] = useMutation(mutation.update[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true,
  })

  const { data, isLoading, refetch } = useQuery('subagents', async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

  setRefetch(refetch)

  const handleDelete = async (id: number) => {
    handlerLoader(true)
    try {
      const { data } = await deleteSubagent({ variables: { id } })
      if (data?.deleteSubagent) {
        toast.success("Субагент успешно удалён")
      } else {
        alert("Не удалось удалить субагента")
      }
    } catch (error) {
      toast.error("Произошла ошибка")
      console.debug("Ошибка удаления строки", error)
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: ISubagent) => {
    handlerLoader(true)
    console.log(newData)
    try {
      if (newData.id) {
        await updateSubagent({variables: { input: newData }})
        toast.success("Менеджер обновлен успешно!");
      } else {
        await createSubagent({variables: { input: newData }})
        toast.success("Менеджер создан успешно!");
      }
    } catch (error) {
      toast.error("Произошла ошибка")
      console.debug("Ошибка добавления строки", error)
    } finally {
      refetch()
      handlerLoader(false)
    }
  }

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
  }, [isLoading, data, handlerLoader, setTableData, refetch])

  return (
    <>
      <TableLayout type={type} delete={handleDelete} />
      <Modal create={handleCreate}/>
    </>
  )
}

export default SubagentsPage