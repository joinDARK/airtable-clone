import { ManagerSchema } from "../../../schema";
import { IColumn } from "../../../types";
import {z} from "zod"
import TypeCell from "./type-cell/TypeCell";

interface Props {
  item: z.infer<typeof ManagerSchema>;
  column: IColumn;
}

function Cell({item, column}: Props) {
  return (
    <td className='whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400'>
      <TypeCell type={column.type} value={item[column.key]}/>
    </td>
  )
}

export default Cell