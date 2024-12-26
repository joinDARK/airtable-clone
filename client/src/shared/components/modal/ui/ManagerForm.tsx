import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {FormManagerSchema} from "../../../schema/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "react-toastify"
import {useModalStore} from "../../../store/useModalStore"
import useRelatedData from "../../../../modules/relationship/useRelatedData"
import { RelationshipSelect } from "../../select/RelationshipSelect"

type Manager = z.infer<typeof FormManagerSchema>

interface ManagerFormProps {
  data?: Manager
}

function ManagerForm({data}: ManagerFormProps) {
  const methods = useForm<Manager>({
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

  const onSubmit = (newData: Manager) => {
    toast.success("Данные успешно отправлены! Проверьте данные в консоли, как отправились данные в консоли.")
    console.debug("Данные: ", newData)
  }

  const onError = (errors: any) => {
    toast.error("Ошибки при отправке. Проверьте консоль")
    console.debug("Ошибки при отправке:", errors)
  }

  const {register, handleSubmit, control} = methods

  const modalHandler = useModalStore(store => store.modalHandler)

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
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className='flex justify-end gap-2 mt-6'>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white'
          onClick={() => modalHandler()}
        >
          Закрыть
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md transition-all duration-300 hover:bg-green-700'
          onClick={() => console.log(data.orders, related)}
        >
          Получить связанные данные из кэша
        </button>
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md transition-all duration-300 hover:bg-blue-700'
        >
          Сохранить
        </button>
      </div>
    </form>
  )
}

export default ManagerForm
