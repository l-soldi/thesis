import { useContext } from 'react'
import { ReservationContext, ReservationDispatchContext } from '../../../../../state/Reservation'
import { Input } from '../../../../../components'
import { Actions, UserFields } from '../../../../../state/Reservation/enums'
import { createReservations } from '../../../../../api/methods'
import { useApi } from '../../../../../api/hooks/useApi'
import useFormIsValid from '../../../../../hooks/useFormIsValid'

const Form = () => {
    const dispatch = useContext(ReservationDispatchContext)
    const state = useContext(ReservationContext)
    const ctaCreate = useApi((values) => createReservations(values), "/gestisci/:id", true)
    const { isValid, errors } = useFormIsValid()

    const createReservation = (values: any) => {
        dispatch({type: Actions.UPDATE_USER, payload: values})
        ctaCreate({...values, date: state!.date, expId: state!.expId, peopleNum: state!.peopleNum})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());
        createReservation(values);
    }

    const handleChange = (value: string, action: Actions) => {
        dispatch({ type: action, payload: value })
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
                    minLength={2}
                    maxLength={50}
                    error={!!errors.find(err => err.field === UserFields.NAME)}
                    errorMessage={errors.filter(err => err.field === UserFields.NAME)[0]?.msg}
                    onChange={(e) => handleChange(e.target.value, Actions.UPDATE_NAME)}
                />
                <Input
                    type='text'
                    required
                    label='Cognome'
                    name={UserFields.LASTNAME}
                    minLength={2}
                    maxLength={50}
                    error={!!errors.find(err => err.field === UserFields.LASTNAME)}
                    errorMessage={errors.filter(err => err.field === UserFields.LASTNAME)[0]?.msg}
                    onChange={(e) => handleChange(e.target.value, Actions.UPDATE_LASTNAME)}
                />
                <Input
                    type='text'
                    required
                    label='Email'
                    name={UserFields.EMAIL}
                    minLength={2}
                    maxLength={50}
                    error={!!errors.find(err => err.field === UserFields.EMAIL)}
                    errorMessage={errors.filter(err => err.field === UserFields.EMAIL)[0]?.msg}
                    onChange={(e) => handleChange(e.target.value, Actions.UPDATE_EMAIL)}
                />
                <Input
                    type='tel'
                    required
                    label='Telefono'
                    name={UserFields.PHONE}
                    minLength={10}
                    maxLength={12}
                    error={!!errors.find(err => err.field === UserFields.PHONE)}
                    errorMessage={errors.filter(err => err.field === UserFields.PHONE)[0]?.msg}
                    onChange={(e) => handleChange(e.target.value, Actions.UPDATE_PHONE)}
                />
                <span>
                    <button disabled={!isValid}> Conferma </button>
                </span>
            </form>
        </section>
    )
}

export default Form