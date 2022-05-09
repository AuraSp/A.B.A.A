import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DashboardMainPage from './components/MainPages/Dashboard/Dashboard';
import Home from './components/HomePage/Home';
import Login from './components/AccountPages/Login';
import Register from './components/AccountPages/Register';
import MainContainer from './components/MainPages/Veikla/MainContainer';
import ErrorPage from './components/ErrorPages/ErrorPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/veikla" element={<MainContainer />} />
        <Route path="/dashboard" element={<DashboardMainPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App