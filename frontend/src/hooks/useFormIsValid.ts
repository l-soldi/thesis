import { useContext } from 'react'
import { ReservationContext } from '../state/Reservation'
import { regexEmail, regexName, regexPhone } from '../constants/regex'

const useFormIsValid = () => {
    const context = useContext(ReservationContext)
    const errors :string[] = []

    if (!context) return {isValid: true, errors}

    const { name, lastname, email, phone, date, expId, peopleNum } = context

    if(!name || !name.match(regexName)) errors.push('name')
    if(!lastname || !lastname.match(regexName)) errors.push('lastname')
    if(!email || !email.match(regexEmail)) errors.push('email')
    if(!phone || !phone.match(regexPhone)) errors.push('phone')
    if(!date) errors.push('date')
    if(!expId) errors.push('expId')
    if(!peopleNum) errors.push('peopleNum')

  return {
    isValid: errors.length === 0,
    errors
  }
}

export default useFormIsValid