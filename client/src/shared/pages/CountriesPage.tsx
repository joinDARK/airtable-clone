import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"

import useTableStore from "@store/useTableStore"
import { TableKey } from "@shared_types/TableKey"
import { ResCountrySchema } from "@schema/response"
import { client, queries } from "@services/graphql"
import { Modal } from "@components/modal/Modal"
import TableLayout from "@components/table/TableLayout"
import useLoaderStore from "@store/useLoaderStore"

function CountriesPage() {
  const type: TableKey = "countries"
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)

  const { data, isLoading } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type] })
    return data
  })

  useEffect(() => {
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
  }, [isLoading, data, handlerLoader, setTableData]);

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default CountriesPage