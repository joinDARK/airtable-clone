import TableLayout from "../components/table/TableLayout.tsx"
import useTableStore from "../store/useTableStore.ts"
import { Modal } from "../components/modal/Modal.tsx"
import useLoaderStore from "../store/useLoaderStore.ts"
import { useGraphQL } from "../../modules/graphql/useGraphQL.ts"
import { useEffect } from "react"

function ManagersPage() {
  const type = "managers"
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

export default ManagersPage