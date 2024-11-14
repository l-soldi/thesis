import { useEffect, useContext } from 'react';
import { ToastContext } from '../../state/Toast';
import './style.css';
import { ToastVariants } from './enum';

interface ToastProps {
    show: boolean;
    message: string;
    variant: ToastVariants;
}

const Toast = ({ show, message, variant = ToastVariants.SUCCESS }: ToastProps) => {
    const { closeToast } = useContext(ToastContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            closeToast();
        }, 3000);
        return () => clearTimeout(timer);
    }, [show]);

    return (
        <div className={`toast toast-${variant.toLowerCase()} ${!show && 'toast-non-visible'}`}>
            THIS IS A VERY CUTE MESSAGE: {message}
        </div>
    );
};

export default Toast;