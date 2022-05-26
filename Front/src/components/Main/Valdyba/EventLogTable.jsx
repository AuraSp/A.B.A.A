import React, { useState, useEffect } from 'react'
import ListLog from './ListLog'
// import { updateLogs } from '../../../api/lib/LogsAPI';

function EventLogTable({ setAll, all, setRender, setCatFilter }) {

    function sortByDate(a, b) {

        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }

    all.sort(sortByDate);
    return (
        <>
            <div>
                <select defaultValue={""} onChange={(e) => { setCatFilter(e.target.value) }} className='btn border-1 border-secondary historyPageSelectOption'>
                    <option value={""}>Rodyti visus veiksmus</option>
                    <option value={"Pridėjo"}>Rodyti tik pridėjimus</option>
                    <option value={"Ištrynė"}>Rodyti tik pašalinimus</option>
                    <option value={"Atnaujino"}>Rodyti tik atnaujinimus</option>
                    <option value={"Atsiunte"}>Rodyti tik atsisiuntimus</option>
                </select>
                <input type="select" className='p-1'/>
            </div>
            <table className='table table-borderless mx-auto'>
                <thead className='thead text-center'>
                    <tr className='text-secondary'>
                        <th>Vartotojo ID</th>
                        <th>Atliktas veiksmas</th>
                        <th>Atlikto veiksmo data</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {all.map((data) => (
                        <ListLog
                            userId={data.userId}
                            text={data.text}
                            createdAt={data.createdAt}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EventLogTable