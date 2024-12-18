

function ManagerForm() {
  return (
    <form className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Имя<sup className='text-red-600'> обязательное</sup>
        </label>
        <input
          type='text'
          placeholder='Введите имя менеджера'
          className='mt-1 block w-full dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 rounded-md shadow-sm hover:border-gray-400 transition-all focus:ring-blue-500 focus:border-blue-500'
          required
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
          required
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
          required
        />
      </div>
    </form>
  )
}

export default ManagerForm