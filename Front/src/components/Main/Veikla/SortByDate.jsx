import React from 'react';

export default function SortByDate({ setFirstDate, setLastDate }) {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);


    return (
        <>
            <div className='d-flex flex-column'>
                <label className='text-center'><h6>Pagal datos pradžią</h6></label>
                <input id="date-start"
                    className='btn border-1 border-secondary p-1'
                    type='date'
                    min='1990-01-01'
                    max='2030-01-01'
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    onChange={(e) => setFirstDate(e.target.value)}
                ></input>
            </div>
            <div className='d-flex flex-column ms-5'>
                <label className='text-center'><h6>Pagal datos pabaigą</h6></label>
                <input id="date-stop"
                    className='btn border-1 border-secondary p-1'
                    type='date'
                    defaultValue={today}
                    min='1990-01-01'
                    max='2030-01-01'
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    onChange={(e) => setLastDate(e.target.value)}
                ></input>
            </div>
        </>
    )
}
