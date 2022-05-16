import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';
import { createNewUser } from '../../api/lib/TransactionsAPI';
import "./register.css"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState("")

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    let navigate = useNavigate();
    useEffect(() => {
        userRef.current.focus();
        if (localStorage.user !== undefined) {
            navigate('/veikla');
          }
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchPwd])

    const handleSubmit = async  (e, data) => {
          e.preventDefault();
      
          await createNewUser(name, password, email)
          setSuccess(true)
        }

    return (
        <div className='login'>
            {success ? (
                <section className="prisijungimas rounded">
                    <h1>Užsiregistruota sėkmingai!</h1>
                    <p>
                    <Link to="/login">Prisijunkite</Link>
                    </p>
                </section>
            ) : (
                <section className="prisijungimas rounded">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Registracija</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Slapyvardis:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Nuo 4 iki 20 simbolių.<br />
                            Turi prasidėti raide.<br />
                            Raidės, skaičiai ir brukšniai yra leidžiami.
                        </p>

                          <label htmlFor="email">
                            El. paštas:
                            <br/>
                          <input
                          id="email"
                          type="text"
                          autoComplete="off"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          >
                          
                          </input>
                          </label>

                        <label htmlFor="password">
                            Slaptažodis:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Nuo 8 iki 24 simbolių.<br />
                            Slaptažodis turi būti sudarytas iš mažos ir didelės raides, skaičiaus ir spec. simbolio.<br />
                            Leidžiami spec. simboliai: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Patvirtinkite slaptažodį:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Slaptažodžiai turi sutapti.
                        </p>

                        <button className='btn btn-light mt-1' disabled={!validName || !validPwd || !validMatch ? true : false}>Registruotis</button>
                    </form>
                    <p>
                        Jau užsiregistravote?<br />
                        <span className="line">
                        <Link to="/login">Prisijunkite</Link>
                        </span>
                        <br/>
                        <span>
                        <Link to="/">Grįžti į pagrindinį</Link>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register
