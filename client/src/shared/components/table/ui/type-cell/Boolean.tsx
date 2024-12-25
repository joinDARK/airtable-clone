interface Props {
  value: boolean;
}

function Boolean({value}: Props) {
  return (
    <div className='w-full h-full px-6'>{value ? "Да" : "Нет"}</div>
  )
}

export default Boolean