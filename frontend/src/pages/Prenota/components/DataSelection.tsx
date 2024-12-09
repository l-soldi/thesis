import { useApi } from '../../../api/hooks/useApi'
import { createReservations } from '../../../api/methods'
import { Reservation } from '../../../api/types'
import Form from '../../../components/Form/Form'

const DataSelection = () => {
  const ctaCreate = useApi((values) => createReservations(values), "/gestisci", true)

  const createReservation = (values: Omit<Reservation, "id">) => {
      ctaCreate(values)
  }

  return (
    <section className='side data-input'>
      <Form onSubmit={createReservation}/>
      <p> Nota: se non viene selezionata alcuna esperienza, verrà assegnata di default la prima in lista. </p>
    </section>
  )
}

export default DataSelection