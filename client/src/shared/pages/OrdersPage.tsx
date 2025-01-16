import { useEffect } from "react";
import { z } from "zod";
import { useQuery } from "react-query";
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify";

import { Modal } from "@components/modal/Modal";
import TableLayout from "@components/table/TableLayout";
import useTableStore from "@store/useTableStore";
import useLoaderStore from "@store/useLoaderStore";
import { TableKey } from "@shared_types/TableKey";
import { ResOrderSchema } from "@schema/response";
import { client, queries } from "@services/graphql";
import { queryClient } from "@services/api/queryClient"

function OrdersPage() {
  const type: TableKey = "orders";
  const setTableData = useTableStore((store) => store.setData);
  const handlerLoader = useLoaderStore((store) => store.setIsLoading);
  const setRefetch = useTableStore((store) => store.setRefetchTable)

  const { data, isLoading, refetch } = useQuery(type, async () => {
    const { data } = await client.query({ query: queries[type], fetchPolicy: 'cache-first' });
    return data;
  });

  const handleRefetch = async () => {
    handlerLoader(true)
    try {
      const { data } = await client.query({
        query: queries[type], fetchPolicy: 'network-only'
      });
      queryClient.setQueryData(type, data)
    } catch(e) {
      toast.error("Произошла ошибка при refetch данных");
      console.debug("Ошибка при refetch данных:", e);
    } finally {
      handlerLoader(false)
    }
  }

  useEffect(() => {
    setRefetch(refetch)
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

  return (
    <>
      <TableLayout type={type} delete={async () => console.log("Delete")} create={async () => console.log("Create")} forceRefetch={handleRefetch}/>
      <Modal />
    </>
  );
}

export default OrdersPage;
