import React, { useState, ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";

import { FileDragAndDropArea } from "./FileDragAndDropArea";
import { LocalFileList } from "./LocalFileList";
import api from "@services/api/file";
import IFile from "@interfaces/IFile";

interface Props {
  editingHandler: (state: boolean) => void;
  data: FileData;
  typeCell: string;
  orderId: number;
}

interface FileData {
  id: string;
  originalname: string;
  fileName: string;
  type: string;
  orderId: string;
}

const UploadFiles: React.FC<Props> = ({
  editingHandler,
  typeCell,
  orderId,
}) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveLocalFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Выберите файлы перед отправкой.");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    console.log(files)
    formData.append("orderId", orderId.toString());
    formData.append("type", typeCell);

    try {
      const res = await api.files.uploadMultiple(formData);
      if (res.status === 200) {
        toast.success("Файлы загружены!");
        setFiles([]);
      } else {
        console.log("Ошибка", res);
        throw new Error();
      }
    } catch (error) {
      console.error("Ошибка при отправке файлов:", error);
      toast.error("Ошибка при отправке файлов.");
    } finally {
      editingHandler(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload}>
        <FileDragAndDropArea
          handleFileChange={handleFileChange}
          inputRef={inputRef}
        />
        {files.length > 0 && (
          <>
            <LocalFileList files={files} handleRemoveLocalFile={handleRemoveLocalFile} />
          </>
        )}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
            onClick={() => editingHandler(false)}
          >
            Закрыть
          </button>
          <button type="submit" className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-green-600 hover:bg-green-700 transition-all duration-300 text-white">Сохранить</button>
        </div>
      </form>
    </div>
  );
};

export default UploadFiles;
