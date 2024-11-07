import { useContext } from 'react'
import { ReservationDispatchContext } from '../../../../state/Reservation'
import { Input } from '../../../../design-system'
import { Actions, UserFields } from '../../../../state/Reservation/enums'

const Form = () => {
    const dispatch = useContext(ReservationDispatchContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());
        if(dispatch) dispatch({type: Actions.UPDATE_USER, payload: values})
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