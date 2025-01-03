import clsx from 'clsx'
import { optionsConfig } from '../../../../configs/options/optionConfig';
import IOptions from '../../../../interfaces/IOptions';

interface Props {
  // value: {
  //   label: string
  //   style: string
  // }
  value: string;
  columnKey?: string;
}

function Option({value, columnKey: keyCell}: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        optionsConfig[keyCell as keyof IOptions]?.find(option => option.value == value)?.style ?? "bg-blue-100 text-blue-800 border-blue-200"
      )}
      id={`${value}`}
    >
      {value}
    </span>
  )
}

export default Option