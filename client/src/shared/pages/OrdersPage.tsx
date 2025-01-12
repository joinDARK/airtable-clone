import { useEffect } from "react";
import { z } from "zod";
import { useQuery } from "react-query";
import { Modal } from "@components/modal/Modal";
import TableLayout from "@components/table/TableLayout";
import useTableStore from "@store/useTableStore";
import useLoaderStore from "@store/useLoaderStore";
import { TableKey } from "@shared_types/TableKey";
import { ResOrderSchema } from "@schema/response";
import { client, queries } from "@services/graphql";
// import configs from "@configs/index";

function OrdersPage() {
  const type: TableKey = "orders";
  const setTableData = useTableStore((store) => store.setData);
  const handlerLoader = useLoaderStore((store) => store.setIsLoading);
  const setRefetch = useTableStore((store) => store.setRefetchTable)


  const { data, isLoading, refetch } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type] });
    return data;
  });


  useEffect(() => {
    setRefetch(refetch);
    if (isLoading) {
      handlerLoader(true);
    } else {
      handlerLoader(false);
      try {
        const validatedData = z.array(ResOrderSchema).parse(data?.[type]);
        setTableData(validatedData);
      } catch (error) {
        console.error("Ошибка валидации страницы:", error);
      }
    }
  }, [isLoading, data, handlerLoader, setTableData, refetch]);

  // const { columns } = configs[type];

  return (
    <>
      <TableLayout type={type} delete={async () => console.log("Delete")} create={async () => console.log("Create")}/>
      <Modal />
    </>
  );
}

export default OrdersPage;
