import React from 'react';
import './error.css';

function ErrorPage() {
  return (
    <div className='container-fluid text-center bg-dark error'>
      <h1 className='text-danger pt-4'>Error!</h1>

      <img className='w-50 mt-5 rounded' src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif" alt="error" />
    </div>
  )
}

export default ErrorPage