import { useContext } from 'react'
import { CardCarousel } from '../../../design-system'
import { ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'

const ExperiencesList = () => {
  const dispatch = useContext(ReservationDispatchContext)

  const handleClick = (expId: number) => {
    if(dispatch) dispatch({ type: Actions.UPDATE_EXP_ID, payload: expId })
  }

  return (
    <section className='side'>
      <CardCarousel handleClick={handleClick}/>
    </section>
  )
}

export default ExperiencesList