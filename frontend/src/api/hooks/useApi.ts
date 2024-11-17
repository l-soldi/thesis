import { useContext } from "react";
import { ToastContext } from "../../state/Toast";
import { useNavigate, useRevalidator } from "react-router-dom";

export const useApi = (method: any, navigateTo?:string, revalidate=false) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const revalidator = useRevalidator()

  const callback = async (values: any) => {
    method(values)
      .then((res: string) => {
        showSuccessToast();
        if(revalidate) revalidator.revalidate();
        if(navigateTo) {
          const _navigateTo = navigateTo.replace(':id', res);
          navigate(_navigateTo, { replace: true })};
      })
      .catch(showErrorToast);
  }

  return callback;
}
