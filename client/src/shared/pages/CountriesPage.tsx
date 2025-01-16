import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import useTableStore from "@store/useTableStore"
import { TableKey } from "@shared_types/TableKey"
import { ResCountrySchema } from "@schema/response"
import { client, queries, mutation } from "@services/graphql"
import { Modal } from "@components/modal/Modal"
import TableLayout from "@components/table/TableLayout"
import useLoaderStore from "@store/useLoaderStore"
import ICountry from "@interfaces/table/ICountry"
import { queryClient } from "@services/api/queryClient"
import { FormCountrySchema } from "@schema/form"

function CountriesPage() {
  const type: TableKey = "countries"
  const setTableData = useTableStore((store) => store.setData)
  const setRefetch = useTableStore((store) => store.setRefetchTable)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const [deleteCountry] = useMutation(mutation.delete[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  });

  const [createCountry] = useMutation(mutation.create[type], {
    refetchQueries: [{ query: queries[type] }],
    awaitRefetchQueries: true, // Добавлено для ожидания завершения refetch
  })

  const [updateCountry] = useMutation(mutation.update[type], {
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
      const { data } = await deleteCountry({variables: {id}})
      if (data?.deleteCountry) {
        toast.success("Страна успешна удалён");
        refetch();
      } else {
        alert("Не удалось удалить страну");
      }
    } catch (error) {
      toast.error("Произошла ошибка");
      console.debug("Ошибка удаления строки", error);
    } finally {
      handlerLoader(false)
    }
  }

  const handleCreate = async (newData: ICountry) => {
    handlerLoader(true)
    const parse = FormCountrySchema.safeParse(newData)
    try {
      if (newData.id) {
        await updateCountry({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Страна обновлена успешно!");
      } else {
        await createCountry({variables: { input: parse.success ? parse.data : newData }})
        toast.success("Страна создана успешно!");
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
      await updateCountry({variables: { input: newData }})
      toast.success("Страна обновлена успешно!");
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
        const validatedData = z.array(ResCountrySchema).parse(data[type])
        setTableData(validatedData)
      } catch (error) {
        console.error("Ошибка валидации страницы:", error)
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch]);

  return (
    <>
      <TableLayout type={type} delete={handleDelete} create={handleCreate} forceRefetch={handleRefetch}/>
      <Modal submit={handleCreate} handlerValue={handleUpdateValue}/>
    </>
  )
}

export default CountriesPage