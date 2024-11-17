import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useId } from 'react';
import './style.css'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: HTMLInputTypeAttribute;
    label: string;
    error?: boolean;
    errorMessage?: string
}

const Input: React.FC<InputProps> = ({ type, label, error, errorMessage, ...props }) => {
    const id = useId();

    return <div className='input-container'>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} {...props} />
        {error && <div className='error-message'>{errorMessage}</div>}
    </div>
};

export default Input;