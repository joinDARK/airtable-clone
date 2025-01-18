import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import { client, queries, mutation } from "@services/graphql"
import useLoaderStore from "@store/useLoaderStore"
import useTableStore from "@store/useTableStore"
import { TableKey } from "@shared_types/TableKey"
import { ResAgentSchema } from "@schema/response"
import { Modal } from "@components/modal/Modal"
import TableLayout from "@components/table/TableLayout"
import IClient from "@interfaces/table/IClient"
import { FormAgentSchema } from "@schema/form"
import { queryClient } from "@services/api/queryClient"

function AgentsPage() {
  const type: TableKey = "agents"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const [deleteAgent] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createAgent] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateAgent] = useMutation(mutation.update[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const { data, isLoading, refetch } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

  const handleDelete = async (id: number) => {
    handlerLoader(true)
    try {
      const { data } = await deleteAgent({variables: {id}})
      if (data?.deleteAgent) {
        toast.success("Агент успешно удалён");
        refetch();
      } else {
        alert("Не удалось удалить агента");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.debug("Ошибка удаления строки", error);
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: IClient) => {
    handlerLoader(true)
    const parse = FormAgentSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateAgent({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Агент обновлен успешно!");
      } else {
        await createAgent({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Агент создан успешно!");
      }
    } catch (error) {
      toast.error("Произошла ошибка при отправке данных");
      console.debug("Ошибка при отправке данных:", error);
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
      await updateAgent({variables: { input: newData }})
      toast.success("Агент обновлен успешно!");
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
      handlerLoader(true);
    } else {
      handlerLoader(false);
      try {
        const validatedData = z.array(ResAgentSchema).parse(data.agents)
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData]);

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} forceRefetch={handleRefetch}/>
      <Modal handlerValue={handleUpdateValue}/>
    </>
  )
}

export default AgentsPage