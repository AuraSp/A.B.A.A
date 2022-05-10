import React from 'react';

export default function SortByDate({ searchDate, setFirstDate, setLastDate }) {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);


    return (
        <>
            <label className='text-start'>Pradžia</label>
            <input id="date-start"
                type='date'
                min='1990-01-01'
                max='2030-01-01'
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                onChange={(e) => setFirstDate(e.target.value)}
            ></input>

            <label className='text-start'>pabaiga</label>
            <input id="date-stop"
                type='date'
                defaultValue={today}
                min='1990-01-01'
                max='2030-01-01'
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                onChange={(e) => setLastDate(e.target.value)}
            ></input>
            <div><button onClick={(e) => searchDate(e)}>filter</button></div>
        </>
    )
}
