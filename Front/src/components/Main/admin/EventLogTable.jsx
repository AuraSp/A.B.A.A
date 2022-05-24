import React, {useState, useEffect} from 'react'
import ListLog from './ListLog'
// import { updateLogs } from '../../../api/lib/LogsAPI';

function EventLogTable({setAll, all, setRender}) {

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
                        <th>userId</th>
                        <th>veiksmas</th>
                        <th>data</th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (
                       
                        <ListLog
                            userId={data.userId}
                            text ={data.text}
                            createdAt = {data.createdAt}
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