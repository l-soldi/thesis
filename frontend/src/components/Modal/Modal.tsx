import { useContext } from 'react'
import { ModalTypes } from './types';
import BodyEdit from './BodyEdit';
import BodyDelete from './BodyDelete';
import './style.css'
import { ModalContext } from '@state/Modal';
import { FullReservation } from '@api/types';

type Props = {
    type: ModalTypes | null;
    cta?: (...args) => Promise<any>;
    defaultValues?: Partial<FullReservation>
}

const Modal = ({type, cta , defaultValues}: Props) => {
    const {show, closeModal} = useContext(ModalContext)

    const handleOnConfirm = (values) => {
        cta?.(values);
        closeModal();
    }

    if (!show || !type ) return null;

    return <div className='modal-overlay'>
        <div className='modal'>
            <button className='close cancel' onClick={closeModal}> x </button>
            <span className='modal-body'>
                {type === ModalTypes.EDIT && <BodyEdit show={show} onSubmit={handleOnConfirm} defaultValues={defaultValues} /> }
                {type === ModalTypes.DELETE && <BodyDelete show={show} />}
            </span>
            <div className='modal-footer'>
                <button className='cancel' onClick={closeModal}> Annulla </button>
                {type !== ModalTypes.EDIT && <button onClick={handleOnConfirm}> Conferma </button>}
            </div>
        </div>
    </div>
}

export default Modal