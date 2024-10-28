import React, { createContext, ReactNode } from "react";
import useModal from "@components/hooks/useModal";

const initialState = {
  show: false,
  showModal: () => {},
  closeModal: () => {}
}

const ModalContext = createContext(initialState);

const ModalProvider = ({ children } : {children: ReactNode}) => {
  const contextValue = useModal();

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };