import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Valdyba from './components/Main/Valdyba/MainContainer';
import MainAdminTable from './components/Main/admin/MainAdminTable';
import Home from './components/HomePage/Home';
import Login from './components/AccountPages/Login';
import Register from './components/AccountPages/Register';
import MainContainer from './components/Main/Veikla/MainContainer';
import ErrorPage from './components/ErrorPages/ErrorPage';
import EventLogPage from './components/Main/admin/EventLogPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/veikla" element={<MainContainer />} />
        <Route path="/valdyba" element={<Valdyba />} />
        <Route path="/admin" element={<MainAdminTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/eventLog" element={<EventLogPage />} />
      </Routes>
    </Router>
  )
}

export default App