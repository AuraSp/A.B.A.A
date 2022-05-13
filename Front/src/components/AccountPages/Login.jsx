import { useRef, useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom"
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
            setTimeout(function(){
                window.location.href = 'http://localhost:3001/veikla';
             }, 3500);
            }

    return (
        <div className='login'>
            {success ? (
                <section className='prisijungimas rounded'>
                    <h1>Jūs prisijungėte! </h1>
                    <h4>Prašau palaukite</h4>
                    <br />
                   
                </section>
            ) : (
                <section className='prisijungimas rounded'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Prisijungimas</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Slapyvardis:</label>
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
                        <button className='btn btn-light mt-1'>Prisijungimas</button>
                    </form>
                    <p>
                            
                        Reikia paskyros?<br />
                        <span className="line">
                        <Link to="/signup">Užsiregistruokite</Link>
                        </span>
                        <br/>
                        <span className='back'>
                        <Link to="/">Grįžti į pagrindinį</Link>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login