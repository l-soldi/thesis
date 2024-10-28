import { useContext } from "react";
import { ToastContext } from "@state/Toast";
import { useNavigate, useRevalidator } from "react-router-dom";
import { noop } from "@utils/types";

export const useApi = (serviceToCall: (...args) => Promise<any>, navigateTo?:string, revalidate=false, showToasts=true, onSuccess=noop) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const revalidator = useRevalidator()

  const callback = async (...values: any) => {
    serviceToCall(values)
      .then((resp) => {
        // Se la chiamata va a buon fine, mostra un toast di successo
        if (showToasts) showSuccessToast();
        if (onSuccess) onSuccess(resp);
        // Se è necessaria la revalidazione, utile nei casi di modifica ed eliminazione, eseguila
        if(revalidate) revalidator.revalidate();
        if(navigateTo) {
          navigate(navigateTo, { replace: true })};
      })
      // Se la chiamata non va a buon fine, mostra un toast di errore
      .catch(err => showErrorToast(err.message));
  }

  return callback;
}
