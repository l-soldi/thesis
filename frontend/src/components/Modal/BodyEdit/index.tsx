import { useContext } from 'react';
import { ModalProps } from '../types';
import { ModalEditContext } from '../../../state/Modal';
import Input from '../../Input';
import { UserFields } from '../../../state/Reservation/enums';
import { formatDate } from '../../../utils';

const BodyEdit = ({ show } : ModalProps) => {
  const today = formatDate(new Date())
  const { setFormValues, ...values } = useContext(ModalEditContext);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormValues({ [e.target.name]: e.target.value });
  }

  if (!show) return null;
  return (
    <>
      <h3 className='modal-title'>Modifica dati della prenotazione</h3>
      <p className="subtitle">E' permessa la modifica dei soli dati dell'utente, della data e del numero dei partecipanti.</p>
      <form>
        <Input
          type='text'
          required
          label='Nome'
          name={UserFields.NAME}
          value={values.name}
          minLength={2}
          maxLength={50}
          //error={!!errors.find(err => err.field === UserFields.NAME)}
          //errorMessage={errors.filter(err => err.field === UserFields.NAME)[0]?.msg}
          onChange={handleChange}
        />
        <Input
          type='text'
          required
          label='Cognome'
          name={UserFields.LASTNAME}
          value={values.lastname}
          minLength={2}
          maxLength={50}
          //error={!!errors.find(err => err.field === UserFields.LASTNAME)}
          //errorMessage={errors.filter(err => err.field === UserFields.LASTNAME)[0]?.msg}
          onChange={handleChange}
        />
        <Input
          type='text'
          required
          label='Email'
          name={UserFields.EMAIL}
          value={values.email}
          minLength={2}
          maxLength={50}
          //error={!!errors.find(err => err.field === UserFields.EMAIL)}
          //errorMessage={errors.filter(err => err.field === UserFields.EMAIL)[0]?.msg}
          onChange={handleChange}
        />
        <Input
          type='tel'
          required
          label='Telefono'
          name={UserFields.PHONE}
          value={values.phone}
          minLength={10}
          maxLength={12}
          //error={!!errors.find(err => err.field === UserFields.PHONE)}
          //errorMessage={errors.filter(err => err.field === UserFields.PHONE)[0]?.msg}
          onChange={handleChange}
        />
        <Input type='date'
          label='Giorno'
          value={values.date || today}
          name='date'
          onChange={handleChange}
          min={today}
          required
          //error={!!errors.find(err => err.field === "date")}
          //errorMessage={errors.filter(err => err.field === "date")[0]?.msg}
        />
        <Input type='number'
          label='Numero di persone'
          value={values.peopleNum}
          name='peopleNum'
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (val < 0) val = 1;
            if (val > 6) val = 6;
            handleChange(e)}
          }
          min={1}
          max={6}
          minLength={1}
          required
          //error={!!errors.find(err => err.field === "peopleNum")}
          //errorMessage={errors.filter(err => err.field === "peopleNum")[0]?.msg}
        />
      </form>
    </>
  )
}

export default BodyEdit