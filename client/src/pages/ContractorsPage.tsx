import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IContragent } from '../types';
import { FormProvider, useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsContractor';

export const ContractorsPage = () => {
  const defaultValue = {
    name: '',
    orders: []
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const [item, setItem] = useState({});

  const handleView = (item: any) => {
    setIsModalViewOpen(true);
    setItem(item);
  };
  
  const closeModal = () => {
    setIsModalOpen(false)
    setIsModalViewOpen(false);
    reset(defaultValue)
  }

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('contractors', () => api.contractors.getAll(),
  {
    staleTime: 0.3 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newContractor: IContragent) => api.contractors.create(newContractor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contractors');
        toast.success("Контрагент добавлен успешно!");
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.contractors.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("contractors");
      toast.success("Контрагент удален успешно!");
    }
  });
  const updateMutation = useMutation((data: IContragent) => api.contractors.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("contractors");
      closeModal()
      toast.success("Контрагент успешно обновлен!");
    }
  })
  
  const deleteContragent = async (contragent: IContragent) => {
    if (window.confirm("Удалить контрагента из таблицы")) {
      deleteMutation.mutate(contragent.id!)
    }
  };
  const submit = (newContragent: IContragent) => {
    if (typeof newContragent.id === "number") {
      updateMutation.mutate(newContragent)
    } else {
      createMutation.mutate(newContragent)
    }
  };
  const edit = (contragent: IContragent) => {
    reset(contragent)
    setIsModalOpen(true)
    setModalHeader("Изменить контрагента")
  };
  
  const methods = useForm<IContragent>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset } = methods

  return (
    <>
      <DataTable
          title="Котрагенты"
          data={data?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setIsModalOpen(true);
            setModalHeader("Добавить нового контрагента");
          }}
          onEdit={edit}
          onDelete={deleteContragent}
          onCellUpdate={submit}
          onView={handleView}
          isModalViewOpen={isModalViewOpen}
          closeModal={closeModal}
          item={item}
          relatedName={'contractors'}
        />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalHeader}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Наименование<sup className='text-red-600'> обязательное</sup>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder='Введите наименование контрагента'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <OrdersSelect/>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
              >
                Закрыть
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700"
                disabled={createMutation.isLoading || updateMutation.isLoading}
              >
                {createMutation.isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};