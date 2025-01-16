import {useEffect} from "react"
import {z} from "zod"
import {useQuery} from "react-query"
import {toast} from "react-toastify"
import {useMutation} from "@apollo/client"

import TableLayout from "@components/table/TableLayout"
import {Modal} from "@components/modal/Modal"
import useTableStore from "@store/useTableStore"
import useLoaderStore from "@store/useLoaderStore"
import {ResSubagentSchema} from "@schema/response"
import {TableKey} from "@shared_types/TableKey"
import {client, queries, mutation} from "@services/graphql"
import ISubagent from "@interfaces/table/ISubagent"
import { queryClient } from "@services/api/queryClient"
import { FormSubagentSchema } from "@schema/form"

function SubagentsPage() {
  const type: TableKey = "subagents"
  const setTableData = useTableStore(store => store.setData)
  const setRefetch = useTableStore(store => store.setRefetchTable)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const [deleteSubagent] = useMutation(mutation.delete[type], {
    refetchQueries: [{query: queries[type]}],
    awaitRefetchQueries: true,
  })

  const [createSubagent] = useMutation(mutation.create[type], {
    refetchQueries: [{query: queries[type]}],
    awaitRefetchQueries: true,
  })

  const [updateSubagent] = useMutation(mutation.update[type], {
    refetchQueries: [{query: queries[type]}],
    awaitRefetchQueries: true,
  })

  const {data, isLoading, refetch} = useQuery(type, async () => {
    const {data} = await client.query({query: queries[type], fetchPolicy: 'cache-first'})
    return data
  })

  const handleDelete = async (id: number) => {
    handlerLoader(true)
    try {
      const {data} = await deleteSubagent({variables: {id}})
      if (data?.deleteSubagent) {
        toast.success("Субагент успешно удалён")
        refetch()
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
    const parse = FormSubagentSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateSubagent({variables: {input: parse.success ? parse.data : newData}})
        toast.success("Субагент обновлен успешно!")
      } else {
        await createSubagent({variables: {input: parse.success ? parse.data : newData}})
        toast.success("Субагент создан успешно!")
      }
    } catch (error) {
      toast.error("Произошла ошибка")
      console.debug("Ошибка добавления строки", error)
    } finally {
      refetch()
      handlerLoader(false)
    }
  }

  const handleRefetch = async () => {
    handlerLoader(true)
    try {
      const { data } = await client.query({
        query: queries[type], fetchPolicy: 'network-only'
      });
      queryClient.setQueryData(type, data)
    } catch(e) {
      toast.error("Произошла ошибка при refetch данных");
      console.debug("Ошибка при refetch данных:", e);
    } finally {
      handlerLoader(false)
    }
  }

  const handleUpdateValue = async (newData: any) => {
    handlerLoader(true)
    try {
      await updateSubagent({variables: { input: newData }})
      toast.success("Субагент обновлен успешно!");
    } catch(e) {
      toast.error("Произошла ошибка при отправке данных");
      console.debug("Ошибка при отправке данных:", e);
    } finally {
      refetch()
      handlerLoader(false)
    }
  }

  useEffect(() => {
    setRefetch(refetch)
    if (isLoading) {
      handlerLoader(true)
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResSubagentSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch])

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} forceRefetch={handleRefetch}/>
      <Modal submit={handleCreate} handlerValue={handleUpdateValue}/>
    </>
  )
}

export default SubagentsPage
