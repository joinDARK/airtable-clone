import { ServerFileList } from "@components/file/ServerFileList";
import IRelatedData from "@interfaces/IRelatedData";
import { transformDate } from "@services/date_formateer/dateFormateer";
import { useModalStore } from "@store/useModalStore";

interface Props {
  value?: string | IRelatedData[] | number;
  type?: any;
  invalidateTable?: () => void;
}

export default function ViewCellModal({ value, type, invalidateTable }: Props) {
  const data = useModalStore((item) => item.formData);
  const typeCell = useModalStore((cellContent) => cellContent.content);

  console.log(data);

  if (typeof value === "string" && type === "text") {
    return <div>{value.length !== 0 ? transformDate(value) : "—"}</div>;
  } else if (typeof value === "number" && type === "number") {
    return <div>{value.toString()}</div>;
  } else if (Array.isArray(value) && type === "related") {
    return (
      <div className="flex flex-wrap gap-2">
        {value.length === 0
          ? "—"
          : value.map((tag: IRelatedData, i) => (
              <span
                key={i}
                className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {tag.name ?? tag.id}
              </span>
            ))}
      </div>
    );
  } else if (type === "files" && typeCell === data?.files[0]?.type) {
    return (
      <div>
        <ServerFileList
          serverFiles={data?.files}
          invalidateTable={invalidateTable}
        />
      </div>
    );
  } else return "—";
}
