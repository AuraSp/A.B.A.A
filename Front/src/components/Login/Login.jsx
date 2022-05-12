import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "./context/AuthProvider";
import useLoggedUser from '../useLoggedUser';
import axios from "axios"
import {loginUser, signout} from "../../api/lib/TransactionsAPI"
// import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const {loggedUser, setLoggedUser} = useLoggedUser();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [name, password])

    const handleSubmit = async (e, data) => {
        e.preventDefault();
            
            await loginUser(name, password)
            setSuccess(true)
    }
    const logout = async (e) =>{
        e.preventDefault();
        await signout()
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Jūs prisijungėte! </h1>
                    <br />
                    <p>
                        <a href="#">Į pagrindinį</a>
                        <button onClick={logout} > Atsijungti</button>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Prisijungimas</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">El. paštas:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={name}
                            required
                        />

                        <label htmlFor="password">Slaptažodis:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Prisijungimas</button>
                    </form>
                    <p>
                            
                        Reikia paskyros?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Užsiregistruokite</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login