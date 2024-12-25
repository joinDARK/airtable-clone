import { Modal } from "../components/modal/Modal"
import TableLayout from "../components/table/TableLayout"
import { useEffect } from "react"
import useLoaderStore from "../store/useLoaderStore"
import { useGraphQL } from "../../modules/graphql/useGraphQL"
import useTableStore from "../store/useTableStore"

function AgentsPage() {
  const type = 'agents'
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading, isSuccess } = useGraphQL(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true);
    } else if (isSuccess) {
      handlerLoader(false);
      setTableData(data[type]);
    }
  }, [isLoading, isSuccess, data, handlerLoader, setTableData, type]);

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default AgentsPage