import React from 'react'

export enum ModalTypes {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
export type ModalProps = {
  show: boolean,
  type: ModalTypes,
  onConfirm: () => void,
}


const Modal = ({show, type, onConfirm}: ModalProps) => {
  if (!show) return null
  return (
    <div>Modal</div>
  )
}

export default Modal