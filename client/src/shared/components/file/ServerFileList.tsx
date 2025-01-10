import { Trash2 } from "lucide-react";
import React from "react";

interface FileData {
  id: string;
  originalname: string;
  fileName: string;
  type: string;
  orderId: string;
}

interface Props {
  serverFiles: FileData[] | undefined;
}

export const ServerFileList: React.FC<Props> = ({
  serverFiles,
}) => {
  const filesArray = Array.isArray(serverFiles) ? serverFiles : [];

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {filesArray.map((file, index) => (
          <li
            key={file.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 dark:bg-gray-800 p-2 rounded"
          >
            <span className="truncate flex-1">{index + 1}. {file.fileName}</span>
            <button
              type="button"
              onClick={(e) => alert(`Файл с id: ${file.id}`)}
              className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-colors"
              title="Удалить"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
