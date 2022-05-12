import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/Home';
import Main from './components/Main/BudgetMain';
import Login from './components/Login/Login';
import Register from './components/Login/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLoggedUser from './components/useLoggedUser';


function App() {
  const {loggedUser, setLoggedUser} = useLoggedUser()
  return (
    <div className='container-fluid'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Main loggedUser={loggedUser}/>} />
          <Route path="/login" element={<Login setLoggedUser={setLoggedUser}/>} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App