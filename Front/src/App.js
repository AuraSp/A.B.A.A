import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/Home';
import BudgetMain from './components/BudgetPage/BudgetMain';
import Login from './components/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<BudgetMain />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App