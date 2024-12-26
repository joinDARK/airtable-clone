import { Modal } from "../components/modal/Modal";
import TableLayout from "../components/table/TableLayout";
import useTableStore from "../store/useTableStore";
import useLoaderStore from "../store/useLoaderStore";
import { useGet } from "../../modules/graphql";
import { useEffect } from "react";

function OrdersPage() {
  const type = "orders"
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false);
    }
  }, [isLoading, data, handlerLoader, setTableData]);
  
  return (
    <>
      <TableLayout type={type}/>
      <Modal/>
    </>
  )
}

export default OrdersPage