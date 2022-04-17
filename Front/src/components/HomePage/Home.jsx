import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/inflows">Incomes</Link>
      <h1>Incomes</h1>
      <Link to="/signup">Sign up</Link>
    </>
  )
}

export default Home