import { useForm } from "react-hook-form"
import { z }from "zod"
import { ManagerSchema } from "../../../schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type Manager = z.infer<typeof ManagerSchema>;

function ManagerForm() {
  const methods = useForm<Manager>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      name: "",
      tel: "",
      date: "",
      orders: [],
      review_table: []
    }
  })

  const onSubmit = (newData: Manager) => {
    toast.success("Данные успешно отправлены! Проверьте данные в консоли, как отправились данные в консоли.")
    console.debug("Данные: ", newData)
  }

  const onError = (errors: any) => {
    toast.error("Ошибки при отправке. Проверьте консоль")
    console.debug("Ошибки при отправке:", errors);
  };

  const {register, handleSubmit, } = methods

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Имя<sup className='text-red-600'> обязательное</sup>
        </label>
        <input
          type='text'
          placeholder='Введите имя менеджера'
          className='mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
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
          className='mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
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
          className='mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
          {...register("date")}
        />
      </div>
      <div className='flex justify-end gap-2 mt-6'>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white'
        >
          Закрыть
        </button>
        <button
          type="submit"
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700'
        >
          Сохранить
        </button>
      </div>
    </form>
  )
}

export default ManagerForm