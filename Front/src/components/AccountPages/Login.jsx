import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { loginUser, signout } from "../../api/lib/TransactionsAPI"
// import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    let navigate = useNavigate();
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
        if (localStorage.user !== undefined) {
            navigate('/veikla');
        }
    }, [])




    useEffect(() => {
        setErrMsg('');
    }, [name, password])



    const handleSubmit = async (e, data) => {
        e.preventDefault();

        await loginUser(name, password)
        setSuccess(true)
        setTimeout(function () {
            navigate('/veikla');
        });
    }

    return (
        <div className='login'>
            {success ? (
                <>
                </>
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
                        <div className='loginbtn text-center'>
                            <button className='btn btn-light mt-4'>Prisijungimas</button>
                        </div>
                    </form>
                    <p>

                        Reikia paskyros?<br />
                        <span className="line">
                            <Link to="/signup">Užsiregistruokite</Link>
                        </span>
                        <br />
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