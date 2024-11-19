
import { useContext } from 'react'
import { ModalContext } from '../../state/Modal';
import { ModalTypes } from './types';
import BodyEdit from './BodyEdit';
import BodyDelete from './BodyDelete';
import './style.css'

const Modal = () => {
    const { type, show, cta, closeModal } = useContext(ModalContext);

    const handleOnConfirm = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        cta();
        closeModal();
    }

    if (!show || !type ) return null;

    return <div className='modal-overlay'>
        <div className='modal'>
            <button className='close cancel' onClick={closeModal}> x </button>
            <span className='modal-body'>
                {type === ModalTypes.EDIT && <BodyEdit show={show} />}
                {type === ModalTypes.DELETE && <BodyDelete show={show} />}
            </span>
            <div className='modal-footer'>
                <button className='cancel' onClick={closeModal}> Annulla </button>
                <button onClick={handleOnConfirm}> Conferma </button>
            </div>
        </div>
    </div>
}

export default Modal