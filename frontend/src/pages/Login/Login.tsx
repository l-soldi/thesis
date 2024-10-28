import React, { useCallback, useContext, useState } from 'react'
import { Input } from '@components';
import { useApi } from '@api/hooks/useApi'
import { login, register } from '@api/methods';
import { ToastContext } from '@state/Toast';
import { Fields } from '@state/Reservation/enums';
import { writeUserIdToLocalStorage } from '@localStorage/utils';
import './style.css'

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const { showErrorToast } = useContext(ToastContext);

    const onSuccess = useCallback((userId: string) => {
        writeUserIdToLocalStorage(userId)
    }, [])

    const loginCta = useApi((data) => login(...data), '/prenota', true, false, onSuccess)
    const registerCta = useApi((data) => register(...data), '/prenota', true, false, onSuccess)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
        const hasEmptyValues = Object.values(values).some((val: FormDataEntryValue) => val === '');
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
        <>
            <h2>{isRegister? "Registrati" : "Accedi"}</h2>
            <form onSubmit={handleSubmit} className={`input-${isRegister ? "reg" : "no-reg"}`}>
                {isRegister && <>
                    <Input label="Nome" name={Fields.NAME} type="text" defaultValue="Mario" required />
                    <Input label="Cognome" name={Fields.LASTNAME} type="text" defaultValue="Rossi" required />
                </>
                }
                <Input label="Email" name={Fields.EMAIL} type="email" defaultValue="email@email.com" required />
                <Input label="Password" name={Fields.PASSWORD} type="password" defaultValue="password" required />
                <span className="actions">
                    {isRegister && <button className='secondary' onClick={() => setIsRegister(false)}> Indietro </button>}
                    <button  type="submit" id="maincta">{isRegister? "Registrati" : "Login"}</button>
                    {!isRegister && <>
                        <p> Non hai un account? </p>
                        <button className='secondary' type='button' id="register" onClick={()=> {setIsRegister(true)}}> 
                            Registrati
                        </button>
                    </>
                    }
                </span>
            </form>
        </>
    );
};

export default Login