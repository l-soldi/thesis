import  { createContext, ReactNode } from "react";
import useModal from "../../components/hooks/useModal";
import { ModalTypes } from "../../components/Modal/types";
import Modal from "../../components/Modal";
import useModalEdit from "../../components/hooks/useModalEdit";

const initialState = {
  show: false,
  showModal: (args) => {},
  type: undefined as ModalTypes | undefined,
  cta: () => {},
  closeModal: () => {}
}

const initialModalEditState = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: '',
  peopleNum: 0,
  setFormValues: (newValues: any) => {}
}

const ModalContext = createContext(initialState);
const ModalEditContext = createContext(initialModalEditState);

const ModalProvider = ({ children } : {children: ReactNode}) => {
  const contextValue = useModal();
  const contextEditValue = useModalEdit();

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalEditContext.Provider value={contextEditValue}>
        <Modal />
        {children}
      </ModalEditContext.Provider>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider, ModalEditContext };