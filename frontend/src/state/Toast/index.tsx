import  { createContext, ReactNode } from "react";
import Toast from "../../design-system/Toast";
import useToast from "../../design-system/Toast/useToast";

const initialState = {
  show: false,
  showSuccessToast: () => {},
  showErrorToast: () => {},
  closeToast: () => {}
}

const ToastContext = createContext(initialState);

const ToastProvider = ({ children } : {children: ReactNode}) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <Toast {...toast}/>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };