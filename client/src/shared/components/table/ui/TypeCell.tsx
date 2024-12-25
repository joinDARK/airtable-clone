import { transformDate } from "../../../../modules/date_formateer/dateFormateer"
import { IRelatedData } from "../../../types"
import Option from "./type-cell/Option"
import Related from "./type-cell/Related"
import Boolean from "./type-cell/Boolean"
import { File } from "lucide-react"

interface Props {
  value: string | IRelatedData[] | boolean | null | { fileName: string, fileUrl: string }[] // Modify to accept an array of files
  title?: string
  type?: string
}

function TypeCell({ type, value, title }: Props) {
  switch (type) {
    case "option":
      return <Option />

    case "related":
      if (value) {
        return <Related title={title} value={value as IRelatedData[]} />
      } else {
        return <div className="px-2">–</div>
      }

    case "boolean":
      return <Boolean value={value as boolean} />

    case "file":
      if (value && Array.isArray(value)) {
        // If value is an array of files
        return (
          <div className="px-2">
            {value.map((file, index) => (
              <a
                key={index}
                href={file.fileUrl}
                download
                className="flex items-center text-blue-500 hover:text-blue-700 mt-1"
              >
                <File className="w-5 h-5 mr-2" />
                {file.fileName}
              </a>
            ))}
          </div>
        );
      } else {
        return <div className="px-2">–</div>;
      }

    default: {
      const renderValue = (value as string) ?? "—"
      return (
        <div className="px-2">
          {type === "date" ? transformDate(renderValue) : renderValue}
        </div>
      )
    }
  }
}

export default TypeCell
