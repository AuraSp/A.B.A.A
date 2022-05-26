import React, {useState, useEffect} from 'react'
import ListLog from './ListLog'
// import { updateLogs } from '../../../api/lib/LogsAPI';

function EventLogTable({all, data, user}) {
//   console.log(data.map((data)=> data.username))
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
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
            <table>
                <thead>
                    <tr>
                        <th>vartotojo ID</th>
                        <th>Slapyvardis</th>
                        <th>El paštas</th>
                        <th>Rolė</th>
                        <th>Veiksmas</th>
                        <th>Suma</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((datas) => (
                       
                        <ListLog
                            // userId={data.userId}
                            // // username={username}
                            // text ={data.text}
                            // amount={data.amount}
                            createdAt = {datas.createdAt}
                            datas={datas}
                            user={user}
                        />
                    ))}
                </tbody>
            </table>
            </>
            )}
        </>
    );
}

export default EventLogTable