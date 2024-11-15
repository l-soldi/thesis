import  { createContext, ReactNode } from "react";
import useModal from "../../components/hooks/useModal";
import { ModalTypes } from "../../components/Modal/types";
import Modal from "../../components/Modal";

const initialState = {
  show: false,
  showModal: (args) => {},
  type: undefined as ModalTypes | undefined,
  cta: () => {},
  closeModal: () => {}
}

const ModalContext = createContext(initialState);

const ModalProvider = ({ children } : {children: ReactNode}) => {
  const contextValue = useModal();

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };