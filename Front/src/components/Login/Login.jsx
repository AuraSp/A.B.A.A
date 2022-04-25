import React, { useState } from 'react'
import { createNewUser } from '../../api/lib/TransactionsAPI';

function Register() {

  let [seePassword, setSeePassword] = useState('password');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');


  const register = async (e, data) => {
    e.preventDefault();
    console.log(name, email, password)

    await createNewUser(data)
  }
  return (
    <form onSubmit={(e) => { register(e) }}>
      <input name='name' type='text' placeholder='name' onChange={(e) => setName(e.target.value)}></input>
      <input name='email' type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
      <input name='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
      <button type='submit' value='register'>Register</button>
    </form>
  )
}

export default Register