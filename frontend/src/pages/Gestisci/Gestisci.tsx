import { useLoaderData, useNavigate } from 'react-router-dom'
import { FullReservationResponse, FullReservation } from '@api/types'
import Empty from './Empty'
import Table from '@components/Table/Table'
import { useContext, useMemo, useState } from 'react'
import { ModalContext } from '@state/Modal'
import { ModalTypes } from '@components/Modal/types'

import { deleteReservation, updateReservation } from '@api/methods'
import { Modal } from '@components'
import './style.css'
import { useApi } from '@api/hooks/useApi'

const Gestisci = () => {
    const data = useLoaderData() as FullReservationResponse
    const navigate = useNavigate()

    const [defaultValues, setDefaultValues] = useState<FullReservation | null>(null)
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const columns = ['Nome', 'Cognome', 'Email', 'Esperienza', 'Data', 'Partecipanti', 'Prezzo']

    const { showModal } = useContext(ModalContext)
    const [modalType, setModalType] = useState<ModalTypes | null>(null)

    const ctaUpdate = useApi((values) => updateReservation(defaultValues!.id, values), `/gestisci?page=${page}&itemsPerPage=${itemsPerPage}`)
    const ctaDelete = useApi(() => deleteReservation(defaultValues!.id), `/gestisci?page=1&itemsPerPage=${itemsPerPage}`, true)

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

    const onPageChange = (newPage: number) => {
        setPage(newPage)
        navigate(`/gestisci?page=${newPage}&itemsPerPage=${itemsPerPage}`, { replace: true });
    }

    const onItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        navigate(`/gestisci?page=${page}&itemsPerPage=${newItemsPerPage}`, { replace: true });
    }
    const isEmpty = useMemo(() => !data || !data.items.length, [data])

    return (<>
    <Modal type={modalType} cta={cta} defaultValues={defaultValues}/>
        {
            isEmpty
                ? <Empty />
                : <>
                <h2>Le tue prenotazioni </h2>
                <Table
                    rows={data.items.map(({ name, lastname, email, experience: { title }, date, peopleNum, totalPrice }) => [name, lastname, email, title, date, peopleNum.toString(), totalPrice.toString()])}
                    columns={columns}
                    onEdit={(index) => {handleCTA(ModalTypes.EDIT, data.items[index])}}
                    onDelete={(index) => {handleCTA(ModalTypes.DELETE, data.items[index])}} 
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                    totalItems={data.totalItems}
                />
                </>
        }
    </>
  )
}

export default Gestisci