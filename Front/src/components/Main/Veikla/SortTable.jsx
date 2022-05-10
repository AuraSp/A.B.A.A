import React from 'react';

import './Styles/maincontent.css';

function SortTable({ searchDate, setFirstDate, setLastDate }) {
  // e.prevendDefault()
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toISOString().substring(0, 10);
  //  searchDate = ()=>{ console.log("work")}


  return (
    <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow'>SortTable
      <br />
      <label className='text-start'>Pradžia</label>
      <input
        type='date'
        min='1990-01-01'
        max='2030-01-01'
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        onChange={(e) => setFirstDate(e.target.value)}>
      </input>

      <label className='text-start'>pabaiga</label>
      <input
        type='date'
        defaultValue={today}
        min='1990-01-01'
        max='2030-01-01'
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        onChange={(e) => setLastDate(e.target.value)}>
      </input>

      <div>
        <button onClick={(e) => searchDate(e)}>filter</button>
      </div>
    </div>
  )
}


export default SortTable