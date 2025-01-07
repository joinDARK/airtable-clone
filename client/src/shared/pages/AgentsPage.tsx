import { useEffect } from "react"
import { z } from "zod"
import { useQuery } from "react-query"
import { client, queries } from "@services/graphql"

import useLoaderStore from "@store/useLoaderStore"
import useTableStore from "@store/useTableStore"
import { TableKey } from "@shared_types/TableKey"
import { ResAgentSchema } from "@schema/response"
import { Modal } from "@components/modal/Modal"
import TableLayout from "@components/table/TableLayout"

function AgentsPage() {
  const type: TableKey = "agents"
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
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default AgentsPage