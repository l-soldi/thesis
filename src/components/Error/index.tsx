import React from 'react';
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Pagina Non Trovata</h1>
            <p>Spiacenti, la pagina che stai cercando non esiste.</p>
            <button onClick={handleGoBack}>Torna Indietro</button>
        </div>
    );
};

export default ErrorPage;