import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { FiFileText as FileText } from "react-icons/fi";
import { toast } from "react-toastify";
import useDownloadFile from "@services/file/useDownloadFile";
import fileService from "@services/api/file"; 
import useLoaderStore from "@store/useLoaderStore";

interface FileData {
  id: string;
  originalname: string;
  fileName: string;
  type: string;
  orderId: string;
  fileUrl: string;
}

interface Props {
  serverFiles: FileData[] | undefined;
  invalidateTable?: () => void;
}

export const ServerFileList: React.FC<Props> = ({
  serverFiles,
}) => {
  const [files, setFiles] = useState<FileData[]>(serverFiles || []);
  const downloadFile = useDownloadFile();
  const setIsLoading = useLoaderStore(store => store.setIsLoading);

  const handleDelete = async (fileId: string) => {
    try {
      setIsLoading(true);
      await fileService.files.deleteById(fileId);
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
      // if (invalidateTable) {
      //   invalidateTable();
      // }
      toast.success("Файл успешно удален!");
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
      toast.error("Ошибка при удалении файла!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!files.length) {
    return <div>Файлы отсутствуют</div>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 dark:bg-gray-800 p-2 rounded"
          >
            <button
              className="truncate flex-1 flex gap-1 items-center text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => downloadFile(file.fileUrl, file.fileName)}
            >
              <FileText size={18} /> {file.fileName}
            </button>

            <button
              type="button"
              onClick={() => handleDelete(file.id)}
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
