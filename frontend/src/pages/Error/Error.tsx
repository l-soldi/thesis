import React from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="error-page">
            <h1>404 - Pagina Non Trovata</h1>
            <p>Spiacenti, la pagina che stai cercando non esiste.</p>
            <button onClick={handleGoBack}>&lt; Torna indietro</button>
        </div>
    );
};

export default ErrorPage;