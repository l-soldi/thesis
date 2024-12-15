import  { createContext, ReactNode } from "react";
import Toast from "@components/Toast/Toast";
import useToast from "@components/hooks/useToast";

const initialState = {
  show: false,
  showSuccessToast: () => {},
  showErrorToast: (msg?:string) => {},
  closeToast: () => {}
}

const ToastContext = createContext(initialState);

const ToastProvider = ({ children } : { children: ReactNode }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <Toast {...toast}/>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };