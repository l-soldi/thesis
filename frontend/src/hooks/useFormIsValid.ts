import { useContext } from 'react'
import { ReservationContext } from '../state/Reservation'
import { regexEmail, regexName, regexPhone } from '../constants/regex'
import { UserFields } from '../state/Reservation/enums'
import { compareDateFormatter } from '../utils'

const useFormIsValid = () => {
    const context = useContext(ReservationContext)
    const errors :{field:string, msg:string}[] = []

    if (!context) return {isValid: true, errors}

    const { name, lastname, email, phone, date, expId, peopleNum } = context

    if(!name || !name.match(regexName)) errors.push({field: UserFields.NAME, msg: "Il nome deve contenere solo lettere ed essere lungo almeno 2 caratteri"})
    if(!lastname || !lastname.match(regexName)) errors.push({field: UserFields.LASTNAME, msg: "Il cognome deve contenere solo lettere ed essere lungo almeno 2 caratteri"})
    if(!email || !email.match(regexEmail)) errors.push({field: UserFields.EMAIL, msg: "Inserisci un'email valida"})
    if(!phone || !phone.match(regexPhone)) errors.push({field: UserFields.PHONE, msg: "Inserisci un numero di telefono valido"})
    if(!date) errors.push({field: 'date', msg: "Inserisci una data valida"})
    if(date && (compareDateFormatter(new Date(date)) < compareDateFormatter(new Date()))) errors.push({field: 'date', msg: "Inserisci una data futura"})
    if(!expId) errors.push({field: 'expId', msg: "Seleziona un'esperienza"})
    if(!peopleNum) errors.push({field: 'peopleNum', msg: "Inserisci il numero di persone"})

  return {
    isValid: errors.length === 0,
    errors
  }
}

export default useFormIsValid