import { ModalProps } from '../types';
import './style.css'

const BodyEdit = ({ show } : ModalProps) => {
  if (!show) return null;

  return (
    <div>
      TODO: inserire form per cambiare i dati di chi prenota
    </div>
  )
}

export default BodyEdit