import IColumn from "../../../interfaces/IColumn"
import Cell from "./Cell";
import TableActions from "./TableActions";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  columns: IColumn[];
  data: any[];
  sortConfig: { key: string; direction: string } | null;
  onSort: (key: string) => void;
}

function Table({ columns, data, sortConfig ,onSort }: Props) {

  return (
    <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-500 transition-all'>
      <thead className='bg-gray-50 dark:bg-gray-700'>
        <tr>
          <th
            scope='col'
            className='px-6 py-5 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50 dark:bg-gray-700'
          >
            Действия
          </th>
          {columns.map(column => (
            <th
              key={column.key}
              scope='col'
              className={`px-6 py-5 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider whitespace-nowrap sticky top-0 bg-gray-50 dark:bg-gray-700 cursor-pointer ${column.sortable ? "pointer" : "default"}`}
              onClick={() => onSort(column.key)}
            >
              <div className='flex items-center gap-1'>
                {column.label}
                {column.sortable && (
                  <div className='flex flex-col'>
                    <ChevronUp
                      size={12}
                      className={
                        sortConfig?.key === column.key && sortConfig?.direction === "asc" ? "text-blue-600" : "text-gray-400 dark:text-gray-300"
                      }
                    />
                    <ChevronDown
                      size={12}
                      className={
                        sortConfig?.key === column.key && sortConfig?.direction === "desc"
                          ? "text-blue-600"
                          : "text-gray-400 dark:text-gray-300"
                      }
                    />
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500'>
        {data.map((item, index) => (
          <tr key={index} className='hover:bg-gray-50 dark:hover:bg-gray-500 h-14'>
            <td className='px-4 whitespace-nowrap text-right text-sm font-medium'>
              <TableActions value={item}/>
            </td>
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