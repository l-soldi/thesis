import { useContext } from "react";
import { ToastContext } from "../../state/Toast";
import { useNavigate, useRevalidator } from "react-router-dom";

export const useApi = (serviceToCall: (args) => Promise<T>, navigateTo?:string, revalidate=false) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const revalidator = useRevalidator()

  const callback = async (values: any) => {
    serviceToCall(values)
      .then((res: string) => {
        // Se la chiamata va a buon fine, mostra un toast di successo
        showSuccessToast();
        // Se è necessaria la revalidazione, utile nei casi di modifica ed eliminazione, eseguila
        if(revalidate) revalidator.revalidate();
        // Se è stato passato un path di reindirizzamento, reindirizza l'utente
        if(navigateTo) {
          const _navigateTo = navigateTo.replace(':id', res);
          navigate(_navigateTo, { replace: true })};
      })
      // Se la chiamata non va a buon fine, mostra un toast di errore
      .catch(showErrorToast);
  }

  // Ritorna la funzione di callback
  return callback;
}
