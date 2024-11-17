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

    //TODO: modificare in modo tale che all'onchange cambino tutti i valori cosi` da non dover fare un dispatch per ogni campo e avere validazione runtime

    const createReservation = (values: any) => {
        if(dispatch) dispatch({type: Actions.UPDATE_USER, payload: values})
        ctaCreate({...values, date: state!.date, expId: state!.expId, peopleNum: state!.peopleNum})
    }

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
                    error={errors.indexOf(UserFields.NAME)}
                    errorMessage={UserFields.NAME}
                />
                <Input
                    type='text'
                    required
                    label='Cognome'
                    name={UserFields.LASTNAME}
                    error={errors.indexOf(UserFields.LASTNAME)}
                    errorMessage={UserFields.LASTNAME}
                />
                <Input
                    type='text'
                    required
                    label='Email'
                    name={UserFields.EMAIL}
                    error={errors.indexOf(UserFields.EMAIL)}
                    errorMessage={UserFields.EMAIL}
                />
                <Input
                    type='tel'
                    required
                    label='Telefono'
                    name={UserFields.PHONE}
                    error={errors.indexOf(UserFields.PHONE)}
                    errorMessage={UserFields.PHONE}
                />
                <button disabled={!isValid}> Conferma </button>
            </form>
        </section>
    )
}

export default Form