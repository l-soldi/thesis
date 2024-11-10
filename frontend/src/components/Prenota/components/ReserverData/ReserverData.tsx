import Form from './components/Form'
import ExpRecap from './components/ExpRecap'
import { useContext } from 'react'
import { ReservationContext } from '../../../../state/Reservation'

const ReserverData = () => {
  const state = useContext(ReservationContext)

  if(!state?.date || !state?.expId) return null

  return (
    <div className='container with-form'>
      <ExpRecap />
      <Form />
    </div>
  )
}

export default ReserverData