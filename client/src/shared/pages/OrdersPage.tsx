import { Modal } from "../components/modal/Modal";
import TableLayout from "../components/table/TableLayout";

function OrdersPage() {
  return (
    <>
      <TableLayout type="orders"/>
      <Modal/>
    </>
  )
}

export default OrdersPage