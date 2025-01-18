import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import { client, queries, mutation } from "@services/graphql"
import { TableKey } from "@shared_types/TableKey.ts"
import { ResContragentSchema } from "@schema/response.ts"
import useTableStore from "@store/useTableStore"
import TableLayout from "@components/table/TableLayout"
import { Modal } from "@components/modal/Modal"
import useLoaderStore from "@store/useLoaderStore"
import { FormContragentSchema } from "@schema/form"
import { queryClient } from "@services/api/queryClient"
import IContragent from "@interfaces/table/IContragent"

function ContragentsPage() {
  const type: TableKey = "contragents"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const [deleteContragent] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createContragent] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateContragent] = useMutation(mutation.update[type], {
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
      const { data } = await deleteContragent({variables: {id}})
      if (data?.deleteContragent) {
        toast.success("Контрагент успешно удалён");
        refetch();
      } else {
        alert("Не удалось удалить контрагента");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.debug("Ошибка удаления строки", error);
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: IContragent) => {
    handlerLoader(true)
    const parse = FormContragentSchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateContragent({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Контрагент обновлен успешно!");
      } else {
        await createContragent({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Контрагент создан успешно!");
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
      await updateContragent({variables: { input: newData }})
      toast.success("Контрагент обновлен успешно!");
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
      handlerLoader(false)
      try {
        const validatedData = z.array(ResContragentSchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch]);

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} forceRefetch={handleRefetch}/>
      <Modal handlerValue={handleUpdateValue}/>
    </>
  )
}

export default ContragentsPage