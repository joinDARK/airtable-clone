import TableLayout from "../components/table/TableLayout"
import useTableStore from "../store/useTableStore"
import { Modal } from "../components/modal/Modal"
import useLoaderStore from "../store/useLoaderStore"
import { useEffect } from "react"
import { z } from "zod"
import { ResManagerSchema } from "../schema/response"
import { TableKey } from "../types/TableKey"
import { useQuery } from 'react-query'
import { client, queries, mutation } from '../../modules/graphql'
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"
import IManager from "../interfaces/table/IManager"

function ManagersPage() {
  const type: TableKey = "managers"
  const setTableData = useTableStore((store) => store.setData)
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
    const { data } = await client.query({ query: queries[type] })
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
    try {
      if (newData.id) {
        console.log("Update", newData)
        await updateManager({variables: { input: newData }})
        toast.success("Менеджер обновлен успешно!");
      } else {
        console.log("Create", newData)
        await createManager({variables: { input: newData }})
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

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true)
    } else {
      handlerLoader(false)
      try {
        const validatedData = z.array(ResManagerSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error('Ошибка валидации страницы:', error)
      }
    }
  }, [handlerLoader, setTableData, isLoading, data, refetch])

  return (
    <>
      <TableLayout type={type} delete={handleDelete}/>
      <Modal create={handleCreate}/>
    </>
  )
}

export default ManagersPage