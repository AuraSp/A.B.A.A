import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='fs-1 w-100 p-4 d-flex flex-row justify-content-evenly'>
      <Link to="/budget">Budget Page</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Home