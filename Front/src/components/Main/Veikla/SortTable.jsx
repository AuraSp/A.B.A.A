import React from 'react';
// import { getAllUsers } from '../../../api/lib/TransactionsAPI';
import './activitiesmain.css';


    
function SortTable({searchDate}) { 
  // e.prevendDefault()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);
    //  searchDate = ()=>{ console.log("work")}

    
  return (
  <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow'>SortTable
  <br />
    <label className='text-start'>Pradžia</label>
      <input id="date-start"                      
        type='date'
          min='1990-01-01'
          max='2030-01-01'
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          ></input>

     <label className='text-start'>pabaiga</label>
      <input id="date-stop"                      
        type='date'
          defaultValue={today}
          min='1990-01-01'
          max='2030-01-01'
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          ></input>
             <div><button onClick={(e)=> searchDate(e)}>filter</button></div>
    </div>
      )}


export default SortTable