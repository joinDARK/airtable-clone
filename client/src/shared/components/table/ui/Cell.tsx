import { Table } from "../../../types/Table";
import IColumn from "../../../interfaces/IColumn";
import TypeCell from "./TypeCell";
import { useModalStore } from "../../../store/useModalStore";
import useTableStore from "../../../store/useTableStore";

interface Props {
  item: Table;
  column: IColumn;
}

export default function Cell({ item, column }: Props) {
  const { setModalData, modalHandler } = useModalStore();
  const tableData = useTableStore((store) => store.data);

  const handleCellClick = () => {
    modalHandler();
    setModalData(column.label, "", item[column.key as keyof Table]);
    console.log(item[column.key as keyof Table], column.key, item, tableData);
  };

  return (
    <td
      className="
        text-sm text-gray-900 dark:text-gray-100
        cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400
        px-4 py-1
      "
      onClick={handleCellClick}
    >
      <TypeCell
        title={column.label}
        type={column.type}
        value={item[column.key as keyof Table]}
        columnKey={column.key}
        item={item}
      />
    </td>
  );
}
