import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "react-toastify"
import { useState } from "react";

import {useModalStore} from "@store/useModalStore"
import useRelatedData from "@services/relationship/useRelatedData"
import { RelationshipSelect } from "@components/select/RelationshipSelect"
import IManager from "@interfaces/table/IManager"
import {FormManagerSchema} from "@schema/form"

interface EditManagerProps {
  data?: IManager;
  onSubmit: (newManager: IManager) => Promise<void>
}

function EditManager({data, onSubmit}: EditManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<IManager>({
    resolver: zodResolver(FormManagerSchema),
    defaultValues: data ?? {
      name: "",
      tel: "",
      date: "",
      orders: [],
      review_table: [],
    },
  })

  const related = useRelatedData("managers", "orders")

  const onError = (errors: unknown) => {
    toast.error("Ошибки при отправке. Проверьте консоль")
    console.debug("Ошибки при отправке:", errors)
  }

  const {register, handleSubmit, control} = methods

  const { closeModal } = useModalStore()

  const handleFormSubmit = async (newData: IManager) => {
    setIsSubmitting(true);
    await onSubmit(newData);
    setIsSubmitting(false);
    closeModal()
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Имя<sup className='text-red-600'> обязательное</sup>
        </label>
        <input
          type='text'
          placeholder='Введите имя менеджера'
          className='mt-1 px-3 py-2 block w-full border-gray-300 border dark:border-transparent dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
          {...register("name")}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Номер телефона<sup className='text-red-600'> обязательное</sup>
        </label>
        <input
          type='tel'
          placeholder='Введите номер телефона менеджера'
          className='mt-1 px-3 py-2 block w-full border-gray-300 border dark:border-transparent dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
          {...register("tel")}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          День рождения<sup className='text-red-600'> обязательное</sup>
        </label>
        <input
          placeholder='Выберите день рождения'
          type='date'
          className='mt-1 px-3 py-2 block w-full border-gray-300 border dark:border-transparent dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
          {...register("date")}
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          Заявки
        </label>
        <Controller
          name="orders"
          control={control}
          render={({field}) => (
            <RelationshipSelect
              value={field.value || []}
              placeholder="Выберите заявки"
              options={related}
              title="Заявка"
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          Проверяю
        </label>
        <Controller
          name="review_table"
          control={control}
          render={({field}) => (
            <RelationshipSelect
              value={field.value || []}
              placeholder="Выберите заявки"
              options={related}
              title="Заявка"
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className='flex justify-end gap-2 mt-6'>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white'
          onClick={() => closeModal()}
          disabled={isSubmitting}
        >
          Закрыть
        </button>
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  )
}

export default EditManager
