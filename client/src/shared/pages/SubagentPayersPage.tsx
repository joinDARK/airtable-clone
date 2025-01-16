import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import { ResSubagentPayerSchema } from "@schema/response"
import { client, queries, mutation } from "@services/graphql"
import { TableKey } from "@shared_types/TableKey"
import TableLayout from "@components/table/TableLayout"
import useTableStore from "@store/useTableStore"
import { Modal } from "@components/modal/Modal"
import useLoaderStore from "@store/useLoaderStore"
import { queryClient } from "@services/api/queryClient"
import ISubagentPayer from "@interfaces/table/ISubagentPayer"
import { FormSubagentPayerSchema } from "@schema/form"

function SubagentPayersPage() {
  const type: TableKey = "subagentPayers"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const setForceRefetch = useTableStore(store => store.setForceRefetchTable)

  const [deleteSubagentPayers] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createSubagentPayers] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateSubagentPayers] = useMutation(mutation.update[type], {
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
      const { data } = await deleteSubagentPayers({variables: {id}})
      if (data?.deleteSubagentPayer) {
        toast.success("Плательщик успешно удалён");
        refetch();
      } else {
        alert("Не удалось удалить плательщика");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.debug("Ошибка удаления строки", error);
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: ISubagentPayer) => {
    handlerLoader(true)
    const parse = FormSubagentPayerSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateSubagentPayers({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Плательщик обновлен успешно!");
      } else {
        await createSubagentPayers({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Плательщик создан успешно!");
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
      await updateSubagentPayers({variables: { input: newData }})
      toast.success("Плательщик обновлен успешно!");
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
    setForceRefetch(handleRefetch)
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false);
      try {
        const validatedData = z.array(ResSubagentPayerSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch]);

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} />
      <Modal submit={handleCreate} handlerValue={handleUpdateValue}/>
    </>
  )
}

export default SubagentPayersPage