import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'number' | 'date';
    label: string;
}

const Input: React.FC<InputProps> = ({ type, ...props }) => {
    const id = useId();

    return <>
    <label htmlFor={id}>{props.label}</label>
    <input type={type} id={id} {...props} />
    </>
};

export default Input;