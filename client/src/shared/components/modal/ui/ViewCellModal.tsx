import IRelatedData from "../../../interfaces/IRelatedData";
import { transformDate } from "../../../../modules/date_formateer/dateFormateer";

interface Props {
    value?: string | IRelatedData[] | number
}

export default function ViewCellModal({value}: Props) {
    if (typeof value === 'string') return <div>{value.length != 0 ? transformDate(value) : "—" }</div>
    else if (typeof value === 'number') return <div>{value.toString()}</div>
    else if (Array.isArray(value)) return (
    <div className='flex flex-wrap gap-2'>
        { value.length == 0 ? "—" : value.map((tag: IRelatedData, i) => (
        <span key={i} className='inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
            {tag.name ?? tag.id}
        </span>
        )) }
    </div>
    )
}