import { useContext } from "react";
import { ToastContext } from "../../state/Toast";
import { useNavigate, useRevalidator } from "react-router-dom";

export const useApi = (serviceToCall: (...args) => Promise<any>, navigateTo?:string, revalidate=false, showToasts=true) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const revalidator = useRevalidator()

  const callback = async (...values: any) => {
    serviceToCall(values)
      .then(() => {
        // Se la chiamata va a buon fine, mostra un toast di successo
        if (showToasts) showSuccessToast();
        // Se è necessaria la revalidazione, utile nei casi di modifica ed eliminazione, eseguila
        if(revalidate) revalidator.revalidate();
        // Se è stato passato un path di reindirizzamento, reindirizza l'utente
        if(navigateTo) {
          navigate(navigateTo, { replace: true })};
      })
      // Se la chiamata non va a buon fine, mostra un toast di errore
      .catch(err => showErrorToast(err.message));
  }

  // Ritorna la funzione di callback
  return callback;
}
