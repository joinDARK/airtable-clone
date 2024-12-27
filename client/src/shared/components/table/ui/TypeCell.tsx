import { transformDate } from "../../../../modules/date_formateer/dateFormateer";
import Option from "./type-cell/Option";
import Related from "./type-cell/Related";
import Boolean from "./type-cell/Boolean";
import { ColumnType } from "../../../types/ColumnType";
import IRelatedData from "../../../interfaces/IRelatedData";
import { FiFileText as FileText } from "react-icons/fi";

interface IFile {
  id: number;
  fileName: string;
  fileUrl: string;
  type: string;
}

interface Props {
  value?: string | number | boolean | IRelatedData[] | IFile[];
  title?: string;
  type?: ColumnType;
  keyCell?: string;
  item?: any;
}

export default function TypeCell({ type, value, title, keyCell, item }: Props) {
  if (type === "files") {
    const filesArray = (item && item["files"]) as IFile[] | undefined;

    if (!filesArray || filesArray.length === 0) {
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          Нет файлов
        </div>
      );
    }

    const filteredFiles = filesArray.filter((file) => file.type === keyCell);

    if (filteredFiles.length === 0) {
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          Нет файлов
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 px-2 text-gray-900 dark:text-white">
        {filteredFiles.map((file) => (
          <a
            key={file.id}
            href={file.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FileText size={16} />
            <span className="underline">{file.fileName}</span>
          </a>
        ))}
      </div>
    );
  }

  if (value == null || (Array.isArray(value) && value.length === 0)) {
    return (
      <div className="px-2 text-gray-900 dark:text-white">
        —
      </div>
    );
  }

  switch (type) {
    case "option":
      return (
        <div className="text-gray-900 dark:text-white">
          <Option value={value as string} keyCell={keyCell} />
        </div>
      );

    case "related":
      return (
        <div className="text-gray-900 dark:text-white">
          <Related title={title} value={value as IRelatedData[]} />
        </div>
      );

    case "boolean":
      return (
        <div className="text-gray-900 dark:text-white">
          <Boolean value={value as boolean} />
        </div>
      );

    case "text":
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          {value as string}
        </div>
      );

    case "date":
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          {transformDate(value as string)}
        </div>
      );

    case "number":
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          {((value as number) ?? "–").toString()}
        </div>
      );

    default:
      return (
        <div className="px-2 text-gray-900 dark:text-white">
          Неизвестное значение
        </div>
      );
  }
}
