import  { createContext, ReactNode, useMemo } from "react";
import Modal, { ModalTypes } from "../../design-system/Modal";
import useModal from "../../design-system/Modal/useModal";

const initialState = {
  show: false,
  type: ModalTypes.EDIT,
  cta: () => {},
  showModal: (type: ModalTypes, cta: () => void) => {},
}

const ModalContext = createContext(initialState);

const ModalProvider = ({ children } : {children: ReactNode}) => {
  const { show, type, cta, showModal } = useModal();
  const contextValue = useMemo(() => ({ show, type, cta, showModal }), [show, type, cta, showModal]);

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal show={show} type={type} onConfirm={cta}/>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };