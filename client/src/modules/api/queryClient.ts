import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'При загрузке данных произошла ошибка');
      },
    },
    mutations: {
      retry: 0,
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'При сохранении данных произошла ошибка');
      },
    },
  },
});