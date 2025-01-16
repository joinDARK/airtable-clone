import React, { useState, useMemo } from "react";
import {
  useHistoryQuery,
  useDeleteAllHistoryMutation,
  useDeleteHistoryByUserMutation,
  HistoryRecord,
} from "@hooks/useHistoryQuery";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import { transformDate } from "@services/date_formateer/dateFormateer";
import { History } from "lucide-react";

export const HistoryPage: React.FC = () => {
  const { data, isLoading, isError } = useHistoryQuery();
  const deleteAllMutation = useDeleteAllHistoryMutation();
  const deleteByUserMutation = useDeleteHistoryByUserMutation();

  // Храним выбранного пользователя для фильтрации и удаления
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Массив пользователей для списка (уникальные userName из data)
  const userOptions = useMemo(() => {
    if (!data) return [];
    const uniqueUsers = Array.from(
      new Set(data.map((item) => item.userName))
    ).sort();
    return uniqueUsers.map((u) => ({ value: u, label: u }));
  }, [data]);

  // Отфильтрованные записи истории
  const filteredHistory = useMemo(() => {
    if (!data) return [];
    if (!selectedUser) return data;
    return data.filter((item) => item.userName === selectedUser);
  }, [data, selectedUser]);

  // Кнопка "Удалить всю историю"
  const handleDeleteAll = async () => {
    await deleteAllMutation.mutateAsync();
  };

  // Кнопка "Удалить по пользователю"
  const handleDeleteByUser = async () => {
    if (!selectedUser) return;
    await deleteByUserMutation.mutateAsync(selectedUser);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <BeatLoader color="#3b82f6" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Ошибка при загрузке истории</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center gap-4 text-gray-800 dark:text-white text-xl font-bold p-4 rounded bg-gray-300 dark:bg-gray-600">
        История отсутствует <History size={48} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 dark:text-white">
        История изменений
      </h1>

      {/* Блок выбора пользователя */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="min-w-[200px]">
          <Select
            isClearable
            placeholder="Фильтр по пользователю..."
            value={
              selectedUser ? { value: selectedUser, label: selectedUser } : null
            }
            onChange={(option) => setSelectedUser(option?.value || null)}
            options={userOptions}
            className="relatize z-50"
          />
        </div>

        <button
          onClick={handleDeleteByUser}
          disabled={!selectedUser || deleteByUserMutation.isLoading}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Удалить у выбранного пользователя
        </button>

        <button
          onClick={handleDeleteAll}
          disabled={deleteAllMutation.isLoading}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Удалить всю историю
        </button>
      </div>

      {/* Таблица с историей */}
      <div className="overflow-x-auto rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              <th className="px-4 py-2 dark:text-white">Id</th>
              <th className="px-4 py-2 dark:text-white">Id записи</th>
              <th className="px-4 py-2 dark:text-white">Пользователь</th>
              <th className="px-4 py-2 dark:text-white">Таблица</th>
              <th className="px-4 py-2 dark:text-white">Тип действия</th>
              <th className="px-4 py-2 dark:text-white">Описание</th>
              <th className="px-4 py-2 dark:text-white">Дата</th>
              <th className="px-4 py-2 dark:text-white">Старые данные</th>
              <th className="px-4 py-2 dark:text-white">Новые данные</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((record: HistoryRecord, i) => (
              <tr key={record.id} className="border-b">
                <td className="px-4 py-2 dark:text-white">{i + 1}</td>
                <td className="px-4 py-2 dark:text-white">{record.recordId}</td>
                <td className="px-4 py-2 dark:text-white">{record.userName}</td>
                <td className="px-4 py-2 dark:text-white">
                  {record.tableName}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {record.actionType}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {record.operationDescription}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {transformDate(record.timestamp)}
                </td>

                <td className="px-4 py-2 dark:text-white">
                  {typeof record.previousValues === "object"
                    ? JSON.stringify(record.previousValues, null, 2)
                    : record.previousValues}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {typeof record.changedFields === "object"
                    ? JSON.stringify(record.changedFields, null, 2)
                    : record.changedFields}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
