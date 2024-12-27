import { useState } from "react"

export default function useFile() {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (newFiles: File[] | undefined) => {
    setFiles(newFiles ?? files);
    console.log(files);
  };

  return { files, isUploading, uploadFile };
}