import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import { client, queries, mutation } from "@services/graphql"
import { ResManagerSchema } from "@schema/response"
import { TableKey } from "@shared_types/TableKey"
import IManager from "@interfaces/table/IManager"
import TableLayout from "@components/table/TableLayout"
import useTableStore from "@store/useTableStore"
import { Modal } from "@components/modal/Modal"
import useLoaderStore from "@store/useLoaderStore"
import { queryClient } from "@services/api/queryClient"
import { FormManagerSchema } from "@schema/form"

function ManagersPage() {
  const type: TableKey = "managers"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const [deleteManager] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createManager] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateManager] = useMutation(mutation.update[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const { data, isLoading, refetch } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type], fetchPolicy: 'cache-first' })
    return data
  })

  const handleDelete = async (id: number) => {
    handlerLoader(true)
    try {
      const { data } = await deleteManager({variables: {id}})
      if (data?.deleteManager) {
        toast.success("Менеджер успешно удалён");
        refetch();
      } else {
        alert("Не удалось удалить менеджера");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.debug("Ошибка удаления строки", error);
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: IManager) => {
    handlerLoader(true)
    const parse = FormManagerSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateManager({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Менеджер обновлен успешно!");
      } else {
        await createManager({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Менеджер создан успешно!");
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
      await updateManager({variables: { input: newData }})
      toast.success("Менеджер обновлен успешно!");
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
        const validatedData = z.array(ResManagerSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [handlerLoader, setTableData, isLoading, data, refetch])

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} forceRefetch={handleRefetch}/>
      <Modal submit={handleCreate} handlerValue={handleUpdateValue}/>
    </>
  )
}

export default ManagersPage