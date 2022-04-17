import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/budget">Dashboard</Link>
      <Link to="/signup">Sign up</Link>
    </>
  )
}

export default Home