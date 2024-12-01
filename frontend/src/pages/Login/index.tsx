import React, { useContext, useState } from 'react'
import { Input } from '../../components';
import { useApi } from '../../api/hooks/useApi';
import { login, register } from '../../api/methods';
import { ToastContext } from '../../state/Toast';
import { Fields } from '../../state/Reservation/enums';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const { showErrorToast } = useContext(ToastContext);
    const loginCta = useApi((data) => login(...data), '/prenota')
    const registerCta = useApi((data) => register(...data), '/prenota')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
        const hasEmptyValues = Object.values(values).some((val: string) => val === '');
        if(hasEmptyValues) {
            showErrorToast(); 
            return;
        }
        if (isRegister) {
            registerCta(values.name, values.lastname, values.email, values.password)
        } else {
            loginCta(values.email, values.password);
        }
    }

    return (
        <div>
            <h2>{isRegister? "Registrati" : "Accedi"}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && <>
                    <Input label="Nome" name={Fields.NAME} type="text" defaultValue="Mario" required />
                    <Input label="Cognome" name={Fields.LASTNAME} type="text" defaultValue="Rossi" required />
                </>
                }
                <Input label="Email" name={Fields.EMAIL} type="email" defaultValue="email@email.com" required />
                <Input label="Password" name={Fields.PASSWORD} type="password" defaultValue="password" required />
                {isRegister && <button onClick={() => setIsRegister(false)}>Indietro</button>}
                <button type="submit">{isRegister ? "Registrati" : "Login"}</button>
                {!isRegister && <>
                    <p> Non hai un account? </p>
                    <button id="register" onClick={()=> {setIsRegister(true)}} >Registrati coi dati inseriti</button>
                </>
                }
            </form>
        </div>
    );
};

export default Login