import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useLoaderStore from '../store/useLoaderStore'
import { useGet } from '../../modules/graphql'
import { useEffect } from 'react'
import useTableStore from '../store/useTableStore'

function ContragentsPage() {
  const type = 'contragents'
  const setTableData = useTableStore((store) => store.setData)
  const handlerLoader = useLoaderStore((store) => store.setIsLoading)
  const { data, isLoading, isSuccess } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true);
    } else if (isSuccess) {
      handlerLoader(false);
      setTableData(data[type]);
    }
  }, [isLoading, isSuccess, data, handlerLoader, setTableData, type]);

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default ContragentsPage