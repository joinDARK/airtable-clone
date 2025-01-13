import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import { client, queries, mutation } from "@services/graphql"
import { TableKey } from "@shared_types/TableKey"
import { ResClientSchema } from "@schema/response"
import useLoaderStore from "@store/useLoaderStore"
import useTableStore from "@store/useTableStore"
import { Modal } from "@components/modal/Modal"
import TableLayout from "@components/table/TableLayout"
import IClient from "@interfaces/table/IClient"
import { queryClient } from "@services/api/queryClient"
import { FormClientSchema } from "@schema/form"

function ClientsPage() {
  const type: TableKey = "clients"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const setForceRefetch = useTableStore(store => store.setForceRefetchTable)

  const [deleteClient] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createClient] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateClient] = useMutation(mutation.update[type], {
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
      const { data } = await deleteClient({variables: {id}})
      if (data?.deleteClient) {
        toast.success("Клиент успешно удалён");
        refetch();
      } else {
        alert("Не удалось удалить клиента");
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
    const parse = FormClientSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateClient({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Клиент обновлен успешно!");
      } else {
        await createClient({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Клиент создан успешно!");
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

  useEffect(() => {
    setRefetch(refetch)
    setForceRefetch(handleRefetch)
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResClientSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch]);

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate}/>
      <Modal submit={handleCreate}/>
    </>
  )
}

export default ClientsPage