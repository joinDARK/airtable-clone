import {RefreshCw, Plus, Search} from "lucide-react"
import Table from "./ui/Table";
import config from "../../configs/index.ts"
import { useModalStore } from "../modal/store/useModalStore.ts";
import { createContext } from "react";

interface Props {
  type: "orders" | "managers"
}

interface ITableContext {
  type: string;
}

export const TableLayoutContext = createContext<ITableContext | undefined>(undefined)

function TableLayout({type}:Props) {
  const tableConfig = config[type]
  const modalHandler = useModalStore(store => store.modalHandler);

  return (
    <div className='flex flex-col h-full transition-all duration-300'>
      <div className='sticky mx-a top-0 z-20 bg-white p-6 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600 transition-all'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
            <div className='flex items-center gap-3'>
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-90'
                onClick={() => modalHandler(`Добавить нового ${tableConfig.label}`, type)}
              >
                <Plus size={20} />
                <span>Добавить</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-all shadow-sm active:scale-90 dark:hover:bg-gray-600' title='Refresh'>
              <RefreshCw size={20} className='text-gray-600 dark:text-gray-400' />
            </button>
            </div>
            <div className='relative'>
              <input
                type='text'
                placeholder='Поиск...'
                id='search'
                className='w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg dark:text-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            </div>
          </div>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{tableConfig.label}</h2>
        </div>
      </div>
      <div className='flex-1 overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <TableLayoutContext.Provider value={{type}}>
            <Table columns={tableConfig.columns} />
          </TableLayoutContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default TableLayout