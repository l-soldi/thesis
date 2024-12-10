import { useContext } from 'react'
import { useApi } from '../../../api/hooks/useApi'
import { createReservations } from '../../../api/methods'
import { Reservation } from '../../../api/types'
import Form from '../../../components/Form/Form'
import { ReservationContext } from '../../../state/Reservation'

const DataSelection = () => {
  const ctaCreate = useApi((values) => createReservations(values), "/gestisci", true)
  const state = useContext(ReservationContext)

  const createReservation = (values: Omit<Reservation, "id">) => {
    const vals = {...values, expId: state?.expId ?? 1}
    ctaCreate(vals)
  }

  return (
    <section className='side data-input'>
      <Form onSubmit={createReservation}/>
      <p> Nota: se non viene selezionata alcuna esperienza, verrà assegnata di default la prima in lista. </p>
    </section>
  )
}

export default DataSelection