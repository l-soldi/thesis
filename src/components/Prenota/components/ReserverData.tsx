import { useContext } from 'react'
import { ReservationContext, ReservationDispatchContext } from '../../../state/Reservation'

const ReserverData = () => {
  const state = useContext(ReservationContext)
  const dispatch = useContext(ReservationDispatchContext)

  return (
    <div className='container'>ReserverData</div>
  )
}

export default ReserverData