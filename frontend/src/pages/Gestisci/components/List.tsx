import { useLoaderData } from 'react-router-dom'
import { FullReservation } from '../../../api/types'
import Empty from './Empty'
import Table from '../../../components/Table'
import { useContext, useState } from 'react'
import { ModalContext } from '../../../state/Modal'
import { ModalTypes } from '../../../components/Modal/types'
import { useApi } from '../../../api/hooks/useApi'
import { deleteReservation, updateReservation } from '../../../api/methods'
import { Modal } from '../../../components'

const List = () => {
    const data = useLoaderData() as FullReservation[]
    const [defaultValues, setDefaultValues] = useState<FullReservation | null>(null)

    const columns = ['Nome', 'Cognome', 'Email', 'Esperienza', 'Data', 'Partecipanti', 'Prezzo']

    const { showModal } = useContext(ModalContext)
    const [modalType, setModalType] = useState<ModalTypes | null>(null)
  
    const ctaUpdate = useApi((values) => updateReservation(defaultValues!.id, values))
    const ctaDelete = useApi(() => deleteReservation(defaultValues!.id), `/gestisci`, true)
  
    const handleCTA = (type: ModalTypes, defValues: FullReservation) => {
      showModal()
      setModalType(type)
      setDefaultValues(defValues)
    }
  
    const cta = modalType === ModalTypes.EDIT
      ? ctaUpdate
      : modalType === ModalTypes.DELETE
        ? ctaDelete
        : undefined

    return (<>
    <Modal type={modalType} cta={cta} defaultValues={defaultValues}/>
        {
            !data
                ? <Empty />
                : <Table
                    rows={data.map(({ name, lastname, email, experience: { title }, date, peopleNum, totalPrice }) => [name, lastname, email, title, date, peopleNum.toString(), totalPrice.toString()])}
                    columns={columns}
                    onEdit={(index) => {handleCTA(ModalTypes.EDIT, data[index])}}
                    onDelete={(index) => {handleCTA(ModalTypes.DELETE, data[index])}} 
                />
        }
    </>
  )
}

export default List