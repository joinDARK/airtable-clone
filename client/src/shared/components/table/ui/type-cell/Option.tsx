import clsx from 'clsx'

interface Props {
  // value: {
  //   label: string
  //   style: string
  // }
  value: string;
}

function Option({value}: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        // value.style
      )}
    >
      {value}
    </span>
  )
}

export default Option