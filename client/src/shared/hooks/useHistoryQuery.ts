import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import historyApi from "@services/api/history";

export interface HistoryRecord {
  id: number;
  userName: string;
  tableName: string;
  recordId: number;
  actionType: string;
  changedFields: string[];
  previousValues: any;
  newValues: any;
  operationDescription: string;
  timestamp: string;
}

/**
 * Хук для получения всей истории. 
 * Данные кешируются и автоматически обновляются при мутациях.
 */
export function useHistoryQuery() {
  return useQuery<HistoryRecord[], Error>(
    ["history"], 
    async () => {
      const response = await historyApi.getAll();
      return response.data as HistoryRecord[];
    },
    {
      onError: (err) => {
        console.error(err);
        toast.error("Ошибка при загрузке истории");
      },
    }
  );
}

/** 
 * Удаление всей истории 
 */
export function useDeleteAllHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await historyApi.deleteAll();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["history"]); 
        toast.info("История успешно удалена");
      },
      onError: (err: any) => {
        console.error(err);
        toast.error("Ошибка при удалении всей истории");
      },
    }
  );
}

/**
 * Удаление истории конкретного пользователя
 */
export function useDeleteHistoryByUserMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (userName: string) => {
      await historyApi.deleteByName(userName);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["history"]);
        toast.info("История пользователя удалена");
      },
      onError: (err: any) => {
        console.error(err);
        toast.error("Ошибка при удалении истории пользователя");
      },
    }
  );
}
