import { useModalStore } from '../../../modal/store/useModalStore';
import Option from './components/Option'
import Related from './components/Related'

interface Props {
  value: string | {id: number, name?: string}[];
  type?: string;
}

function TypeCell({type, value}: Props) {
  const modalHandler = useModalStore(store => store.modalHandler)

  switch (type) {
    case "option":
      return <Option/>
    case "related":
      return <Related value={value as {id: number, name?: string}[]}/>
    default:
      return <div className='w-full px-6 py-4' id={type} onClick={() => modalHandler(value as string)}>{value as string}</div>
  }
}

export default TypeCell