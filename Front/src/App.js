import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomePage/home';
import Form from './components/AddIncomeForm/form';
import Incomes from './components/AllIncomesPage/Incomes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incomeform" element={<Form />} />
          <Route path="/allincomes" element={<Incomes />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App