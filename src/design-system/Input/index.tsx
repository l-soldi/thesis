import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
}

const Input: React.FC<InputProps> = ({ type, ...props }) => {
    return <input type={type} {...props} />;
};

export default Input;