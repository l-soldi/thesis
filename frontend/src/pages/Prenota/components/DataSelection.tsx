import { useContext } from 'react'
import { Input } from '../../../components'
import { ReservationContext, ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'
import { formatDate } from '../../../utils'
import useFormIsValid from '../../../hooks/useFormIsValid'

type Props = {
  setShowUserData: (value: boolean) => void
}

const DataSelection = ({ setShowUserData }: Props) => {
  const today = formatDate(new Date())

  const state = useContext(ReservationContext)
  const dispatch = useContext(ReservationDispatchContext)
  const { errors } = useFormIsValid()

  const handleChange = (value: string | number, action: Actions) => {
    dispatch({ type: action, payload: value })
  }

  return (
    <section className='side data-input'>
      <Input type='date'
        label='Giorno'
        value={state?.date || today}
        onChange={(e) => { handleChange(e.target.value, Actions.UPDATE_DATE) }}
        min={today}
        required
        error={!!errors.find(err => err.field === "date")}
        errorMessage={errors.filter(err => err.field === "date")[0]?.msg}
      />
      <Input type='number'
        label='Numero di persone'
        value={state?.peopleNum}
        onChange={(e) => {
          let val = parseInt(e.target.value)
          if (val < 0) val = 1;
          if (val > 6) val = 6;
          handleChange(val, Actions.UPDATE_PEOPLE)}
        }
        min={1}
        max={6}
        minLength={1}
        required
        error={!!errors.find(err => err.field === "peopleNum")}
        errorMessage={errors.filter(err => err.field === "peopleNum")[0]?.msg}
      />
      <button onClick={() => { setShowUserData(true) }}>
        Inserisci i tuoi dati
      </button>
    </section>
  )
}

export default DataSelection