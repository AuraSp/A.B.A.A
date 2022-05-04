import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/Home';
import Main from './components/Main/BudgetMain';
import Login from './components/Login/Login';
import Dashboard from './components/Main/Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App