import React, { useContext } from 'react'
import Input from '../Input'
import { Fields } from '../../state/Reservation/enums'
import { formatDate } from '../../utils'
import { regexEmail, regexName, regexPhone } from '../Input/constants/regex'
import { FullReservation } from '../../api/types'
import { ReservationContext } from '../../state/Reservation'

type Props = {
    onSubmit: (args) => void,
    defaultValues?: Partial<FullReservation>
}

const Form = ({ onSubmit, defaultValues }:Props) => {
    const today = formatDate(new Date())
    const state = useContext(ReservationContext)

    const defaultExpId = defaultValues?.expId ?? state?.expId

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      // Previene il comportamento di default del form
      e.preventDefault();
      // Crea un oggetto FormData con i dati del form e lo trasforma in un oggetto
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const values = Object.fromEntries(formData.entries());
      onSubmit(values);
    }

  return (
    <form onSubmit={handleSubmit}>
        <Input type='date'
          label='Giorno'
          defaultValue={defaultValues?.date ?? today}
          name={Fields.DATE}
          min={today}
          required
        />
        <Input type='number'
          label='Numero di persone'
          defaultValue={defaultValues?.peopleNum ?? 1}
          name={Fields.PEOPLENUM}
          min={1}
          max={6}
          minLength={1}
          size={10}
          required
        />
        <h3> Prenotazione a nome di </h3>
          <Input
            type='text'
            required
            label='Nome'
            name={Fields.NAME}
            defaultValue={defaultValues?.name ?? ''}
            minLength={2}
            maxLength={50}
            pattern={regexName}
          />
          <Input
            type='text'
            required
            label='Cognome'
            name={Fields.LASTNAME}
            defaultValue={defaultValues?.lastname ?? ''}
            minLength={2}
            maxLength={50}
            pattern={regexName}
          />
          <Input
            type='email'
            required
            label='Email'
            name={Fields.EMAIL}
            defaultValue={defaultValues?.email ?? ''}
            minLength={2}
            maxLength={50}
            pattern={regexEmail}
          />
          <Input
            type='tel'
            required
            label='Telefono'
            name={Fields.PHONE}
            defaultValue={defaultValues?.phone ?? ''}
            minLength={8}
            maxLength={12}
            pattern={regexPhone}
          />
          <Input type='number'
            label=''
            defaultValue={defaultExpId ?? 1}
            name={Fields.EXP_ID}
            hidden
            required
          />
        <span>
            <button> Conferma </button>
        </span>
    </form>
  )
}

export default Form