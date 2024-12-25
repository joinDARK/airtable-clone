import { Modal } from "../components/modal/Modal"
import TableLayout from "../components/table/TableLayout"
import useLoaderStore from "../store/useLoaderStore"
import { useGet } from "../../modules/graphql"
import { useEffect } from "react"
import useTableStore from "../store/useTableStore"

function CountriesPage() {
  const type = 'countries'
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

export default CountriesPage