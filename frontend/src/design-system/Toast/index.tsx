import React, { useState, useEffect } from 'react';
import './style.css';

interface ToastProps {
    message: string;
    duration: number; //in ms
    onClose: () => void;
    variant: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose, variant = 'success' }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) {
                onClose();
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`toast toast-${variant}`}>
            {message}
        </div>
    );
};

export default Toast;