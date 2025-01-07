import { FiFileText as FileText } from "react-icons/fi";

import { transformDate } from "@services/date_formateer/dateFormateer";
import Option from "./type-cell/Option";
import Related from "./type-cell/Related";
import Boolean from "./type-cell/Boolean";
import { ColumnType } from "@shared_types/ColumnType";
import IRelatedData from "@interfaces/IRelatedData";

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
  columnKey?: string;
  item?: any;
}

export default function TypeCell({ type, value, title, columnKey, item }: Props) {
  const baseClass = "px-2 text-gray-900 dark:text-white";

  if (type === "files") {
    const filesArray = (item && item.files) as IFile[] | undefined;

    if (!filesArray || filesArray.length === 0) {
      return <div className={baseClass}>Нет файлов</div>;
    }

    const filteredFiles = filesArray.filter((file) => file.type === columnKey);

    if (filteredFiles.length === 0) {
      return <div className={baseClass}>Нет файлов</div>;
    }

    return (
      <div className={`flex flex-wrap gap-2 ${baseClass}`}>
        {filteredFiles.map((file) => (
          <a
            key={file.id}
            href={file.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1 text-blue-600 hover:text-blue-800
              dark:text-blue-400 dark:hover:text-blue-300
            "
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
    return <div className={baseClass}>—</div>;
  }

  switch (type) {
    case "option":
      return (
        <div className={baseClass}>
          <Option value={value as string} columnKey={columnKey} />
        </div>
      );

    case "related":
      return (
        <div className={baseClass}>
          <Related title={title} value={value as IRelatedData[]} />
        </div>
      );

    case "boolean":
      return (
        <div className={baseClass}>
          <Boolean value={value as boolean} />
        </div>
      );

    case "text":
      return <div className={baseClass}>{value as string}</div>;

    case "date":
      return (
        <div className={baseClass}>
          {transformDate(value as string)}
        </div>
      );

    case "number":
      return (
        <div className={baseClass}>
          {((value as number) ?? "–").toString()}
        </div>
      );

    default:
      return <div className={baseClass}>Неизвестное значение</div>;
  }
}
