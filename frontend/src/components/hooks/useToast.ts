import { useState } from "react";
import { ToastVariants } from "../Toast/enum";

type ShowToastArgs = {
  variant: ToastVariants,
  message: string
}

export default () => {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState(ToastVariants.SUCCESS);
  const [message, setMessage] = useState('');

  const showToast = ({ variant, message } : ShowToastArgs) => {
    setShow(true);
    setVariant(variant);
    setMessage(message);
  };

  const closeToast = () => {
    setShow(false);
  }

  const showSuccessToast = () => {
    showToast({ variant: ToastVariants.SUCCESS, message: 'Operazione avvenuta con successo.' });
  }

  const showErrorToast = (msg?:string) => {
    showToast({ variant: ToastVariants.ERROR, message: msg ?? 'Qualcosa e` andato storto, riprova.' });
  }

  return { show, variant, message, showErrorToast, showSuccessToast, closeToast };
};