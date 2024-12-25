import { Modal } from "../components/modal/Modal";
import TableLayout from "../components/table/TableLayout";
import useTableStore from "../store/useTableStore";
import useLoaderStore from "../store/useLoaderStore";
import { useGraphQL } from "../../modules/graphql/useGraphQL";
import { useEffect } from "react";

function OrdersPage() {
  const type = "orders"
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
      <TableLayout type={type}/>
      <Modal/>
    </>
  )
}

export default OrdersPage