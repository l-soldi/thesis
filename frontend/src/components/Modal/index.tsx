
import { useContext } from 'react'
import { ModalContext } from '../../state/Modal';
import { ModalTypes } from './types';
import BodyEdit from './BodyEdit';
import BodyDelete from './BodyDelete';
import './style.css';

const Modal = () => {
    const { type, show, cta, closeModal } = useContext(ModalContext);

    const handleOnConfirm = () => {
        cta();
        closeModal();
    }

    if (!show || !type ) return null;

    return <div className='modal'>
        <button onClick={closeModal} >chiudi</button>
        {type === ModalTypes.EDIT && <BodyEdit show={show} />}
        {type === ModalTypes.DELETE && <BodyDelete show={show} />}
        <div className='modal-footer'>
            <button onClick={closeModal} > Annulla </button>
            <button onClick={handleOnConfirm} > Conferma </button>
        </div>
    </div>;
}

export default Modal