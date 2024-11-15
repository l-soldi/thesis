import { useCallback, useContext } from 'react'
import { ReservationContext, ReservationDispatchContext } from '../../../../../state/Reservation'
import { Input } from '../../../../../components'
import { Actions, UserFields } from '../../../../../state/Reservation/enums'
import { createReservations } from '../../../../../api/methods'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '../../../../../state/Toast'

const Form = () => {
    const dispatch = useContext(ReservationDispatchContext)
    const state = useContext(ReservationContext)
    const navigate = useNavigate()
    const { showSuccessToast } = useContext(ToastContext)

    const createReservation = useCallback(async (values: any) => {
        if(dispatch) dispatch({type: Actions.UPDATE_USER, payload: values})
        const resId = await createReservations({...values, date: state!.date, expId: state!.expId, peopleNum: state!.peopleNum})
        showSuccessToast()
        navigate(`/gestisci/${resId}`)
    }, [dispatch])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());
        createReservation(values);
    }

    return (
        <section className='side form'>
            <h3> I tuoi dati </h3>
            <form onSubmit={handleSubmit}>
                <Input
                    type='text'
                    required
                    label='Nome'
                    name={UserFields.NAME}
                />
                <Input
                    type='text'
                    required
                    label='Cognome'
                    name={UserFields.LASTNAME}
                />
                <Input
                    type='text'
                    required
                    label='Email'
                    name={UserFields.EMAIL}
                />
                <Input
                    type='tel'
                    required
                    label='Telefono'
                    name={UserFields.PHONE}
                />
                <button> Conferma</button>
            </form>
        </section>
    )
}

export default Form