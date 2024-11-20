import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useId } from 'react';
import './style.css'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: HTMLInputTypeAttribute;
    label: string;
}

const suggestions = [
    {type: "text", msg: "Inserisci solo lettere"},
    {type: "email", msg: "Inserisci un'email valida"},
    {type: "tel", msg: "Inserisci un numero di telefono valido, avente almeno 8 caratteri"},
    {type: "date", msg: "Inserisci una data valida"},
    {type: "number", msg: "Inserisci solo cifre numeriche"}
]

const Input: React.FC<InputProps> = ({ type, label, ...props }) => {
    const id = useId();

    // Se l'input non è nascosto, mostra il suggerimento corrispondente al tipo di input
    return <div className='input-container'>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} {...props} />
        {!props.hidden && <p className='suggestion'>{suggestions.filter(sug => sug.type===type)[0]?.msg}</p>}
    </div>
};

export default Input;