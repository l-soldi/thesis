import { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { ReservationContext, ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'
import { Experience } from '../../../api/types'
import { CardCarousel } from '../../../components'

const ExperiencesList = () => {
  const data = useLoaderData() as Experience[]
  const dispatch = useContext(ReservationDispatchContext)
  const state = useContext(ReservationContext)

  const handleClick = (expId: number) => {
    if(dispatch) dispatch({ type: Actions.UPDATE_RESERVATION, payload: {expId} })
  }

  return (
    <section className='side-right'>
      <CardCarousel handleClick={handleClick} idChosen={state?.expId ?? 0} data={data ?? []}/>
    </section>
  )
}

export default ExperiencesList