import { ModalProps } from '../types';

const BodyEdit = ({ show } : ModalProps) => {
  if (!show) return null;

  return (
    <>
      <h3>Modifica dati della prenotazione</h3>
      <p className="subtitle">E' permessa la modifica dei soli dati dell'utente, della data e del numero dei partecipanti.</p>
    </>
  )
}

export default BodyEdit