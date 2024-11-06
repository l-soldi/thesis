import { useContext } from 'react'
import { Input } from '../../../design-system'
import { ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'
import { formatDate } from '../utils'

const DataSelection = () => {
  const today = formatDate(new Date())

  const dispatch = useContext(ReservationDispatchContext)

  const handleChange = (value: string | number, action: Actions) => {
    if(dispatch) dispatch({ type: action, payload: value })
  }

  return (
    <section className='side data-selection'>
      <Input type='date' label='Giorno' onChange={(e) => handleChange(e.target.value, Actions.UPDATE_DATE)} min={today}/>
      <Input type='number' label='Numero di persone' onChange={(e) => handleChange(parseInt(e.target.value), Actions.UPDATE_PEOPLE)}  max={6}/>
      {/* TODO: idea: filtro del prezzo */}
    </section>
  )
}

export default DataSelection