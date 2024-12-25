import TableLayout from "../components/table/TableLayout.tsx"
import useTableStore from "../store/useTableStore.ts"
import { Modal } from "../components/modal/Modal.tsx"
import useLoaderStore from "../store/useLoaderStore.ts"
import { useGet } from "../../modules/graphql/index.ts"
import { useEffect } from "react"

function ManagersPage() {
  const type = "managers"
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading, isSuccess } = useGet(type)

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