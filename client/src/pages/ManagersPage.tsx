import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import type { IManager } from '../types';
import { RelationshipSelect } from '../components/RelationshipSelect';
import { Controller, FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import OrdersSelect from '../components/OrdersSelect';
import { toast } from 'react-toastify';

import columns from '../lib/tableColumnsData/columnsManager';
import ReviewOrdersSelect from '../components/ReviewOrdersSelect';
import { reverseTransformDates } from '../lib/dateFormateer';

export const ManagersPage = () => {
  const defaultValue = {
    name: '',
    tel: '',
    date: '',
    orders: [],
  }
  
  const [modalHeader, setModalHeader] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  
  const closeModal = () => {
    setIsModalOpen(false)
    setIsModalViewOpen(false);
    reset(defaultValue)
  };

  const queryClient = useQueryClient();
  const { data, refetch } = useQuery('managers', () => api.managers.getAll(),
  {
    staleTime: 0.3 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });

  const createMutation = useMutation(
    (newManager: IManager) => api.managers.create(newManager),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('managers');
        toast.success("Менеджер добавлен успешно!");
        closeModal()
      },
    }
  );
  const deleteMutation = useMutation((id: number) => api.managers.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("managers");
      toast.success("Менеджер удален успешно!");
    },
  });
  const updateMutation = useMutation((data: IManager) => api.managers.update(data.id as number, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("managers");
      closeModal()
      toast.success("Менеджер обновлен успешно!");
    }
  });
  
  const deleteManager = async (manager: IManager) => {
    if (window.confirm("Удалить менеджера из таблицы?")) {
      deleteMutation.mutate(manager.id!)
    }
  };
  const submit = (newManager: IManager) => {
    if (typeof newManager.id === "number") {
      updateMutation.mutate(newManager)
    } else {
      createMutation.mutate(newManager)
    }
  };
  const edit = (manager: IManager) => {
    reset(reverseTransformDates(manager))
    setIsModalOpen(true)
    setModalHeader("Изменить менеджера")
  };

  const [item, setItem] = useState({});

  const handleView = (item: any) => {
    setIsModalViewOpen(true);
    setItem(item);
  };
  
  const methods = useForm<IManager>({ defaultValues: defaultValue })
  const { register, handleSubmit, reset, watch } = methods
  
  const selectedOrdersID = watch("orders")

  return (
    <>
      <DataTable
          title="Менеджеры"
          data={data?.data || []}
          columns={columns}
          onRefresh={() => refetch()}
          onAdd={() => {
            setIsModalOpen(true);
            setModalHeader("Добавить нового менеджера");
          }}
          onEdit={edit}
          onDelete={deleteManager}
          onCellUpdate={submit}
          onView={handleView}
          isModalViewOpen={isModalViewOpen}
          closeModal={closeModal}
          item={item}
          relatedName={'managers'}
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
                Имя<sup className='text-red-600'> обязательное</sup>
              </label>
              <input
                type="text"
                placeholder='Введите имя менеджера'
                {...register("name")}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Номер телефона<sup className='text-red-600'> обязательное</sup>
              </label>
              <input
                type="tel"
                {...register("tel")}
                placeholder='Введите номер телефона менеджера'
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                День рождения<sup className='text-red-600'> обязательное</sup>
              </label>
              <input
                placeholder='Выберите день рождения'
                type="date"
                {...register("date")}
                className="mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <OrdersSelect/>
            <ReviewOrdersSelect />
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
                {createMutation.isLoading || updateMutation.isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};