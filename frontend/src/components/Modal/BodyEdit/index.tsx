import { ModalProps } from '../types';
import Form from '../../Form';
import { FullReservation } from '../../../api/types';

type Props = ModalProps & {
  onSubmit: (args) => void;
  defaultValues?: Partial<FullReservation>,
}

const BodyEdit = ({ show, onSubmit, defaultValues } : Props) => {

  const onSub = (vals: any) => {
    onSubmit(vals)
  }

  if (!show) return null;
  return (
    <>
      <h3 className='modal-title'>Modifica dati della prenotazione</h3>
      <p className="subtitle">E' permessa la modifica dei soli dati dell'utente, della data e del numero dei partecipanti.</p>
      <Form onSubmit={onSub} defaultValues={defaultValues}/>
    </>
  )
}

export default BodyEdit