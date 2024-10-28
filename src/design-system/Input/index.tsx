import React, { useId } from 'react';
import './style.css'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'number' | 'date' | 'tel';
    label: string;
}

const Input: React.FC<InputProps> = ({ type, ...props }) => {
    const id = useId();

    return <span>
        <label htmlFor={id}>{props.label}</label>
        <input type={type} id={id} {...props} />
    </span>
};

export default Input;