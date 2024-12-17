import { IColumn } from "../../../types"
import Cell from "./Cell";
import useTableStore from "../store/useTableStore";

interface Props {
  columns: IColumn[];
}

function Table({columns}: Props) {
  const tableData = useTableStore((store) => store.data)
  return (
    <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-500 transition-all'>
      <thead className='bg-gray-50 dark:bg-gray-700'>
        <tr>
          {columns.map(column => (
            <th
              key={column.key}
              scope='col'
              className='px-6 py-5 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50 dark:bg-gray-700'
              style={{cursor: column.sortable ? "pointer" : "default"}}
            >
              <div className='flex items-center gap-1'>
                {column.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500'>
        {tableData.map((item, index) => (
          <tr key={index} className='hover:bg-gray-50 dark:hover:bg-gray-500'>
            {columns.map(column => (
              <Cell key={column.key} column={column} item={item}/>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table