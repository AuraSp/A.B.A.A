import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/incomeform">Income form</Link>
      <Link to="/allincomes">Incomes</Link>
    </>
  )
}

export default Home