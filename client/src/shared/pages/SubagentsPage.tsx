import TableLayout from '../components/table/TableLayout'
import { Modal } from '../components/modal/Modal'
import useTableStore from '../store/useTableStore'
import { useGet } from '../../modules/graphql'
import { useEffect } from 'react'
import useLoaderStore from '../store/useLoaderStore'


function SubagentsPage() {
  const type = 'subagents'
  const setTableData = useTableStore(store => store.setData)
  const handlerLoader = useLoaderStore(store => store.setIsLoading)
  const { data, isLoading, isSuccess } = useGet(type)

  useEffect(() => {
    if (isLoading) {
      handlerLoader(true)
    } else if (isSuccess) {
      handlerLoader(false)
      setTableData(data[type])
    }
  }, [isLoading, isSuccess, data, handlerLoader, setTableData, type])

  return (
    <>
      <TableLayout type={type} />
      <Modal/>
    </>
  )
}

export default SubagentsPage