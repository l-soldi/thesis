import { useContext } from 'react'
import { CardCarousel } from '../../../components'
import { ReservationContext, ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'
import { Experience } from '../../../api/types'
import { useLoaderData } from 'react-router-dom'

const ExperiencesList = () => {
  const data = useLoaderData() as Experience[]
  const dispatch = useContext(ReservationDispatchContext)
  const state = useContext(ReservationContext)

  const handleClick = (expId: number) => {
    if(dispatch) dispatch({ type: Actions.UPDATE_EXP_ID, payload: expId })
  }

  return (
    <section className='side-right'>
      <CardCarousel handleClick={handleClick} idChosen={state?.expId ?? 0} data={data ?? []}/>
    </section>
  )
}

export default ExperiencesList