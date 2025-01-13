import { useCallback } from "react";
import { toast } from "react-toastify";
import useLoaderStore from "@store/useLoaderStore";

export default function useDownloadFile() {
  const setIsLoading = useLoaderStore((store) => store.setIsLoading);

  return useCallback(
    async (fileUrl: string, fileName: string) => {
      try {
        setIsLoading(true);

        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(
            `Ошибка загрузки: ${response.status} ${response.statusText}`
          );
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        toast.success("Файл успешно скачан!");
      } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
        toast.error("Ошибка при скачивании файла!");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );
}
