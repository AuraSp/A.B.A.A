import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className='fs-1 w-100 p-4 d-flex flex-row justify-content-evenly'>
        <Link to="/budget">Biudžeto puslapis</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">login</Link>
      </div>
    </>
  )
}

export default Home