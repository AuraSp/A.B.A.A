// import React, { useState, useEffect } from 'react';
// import OutflowsCard from './OutflowsCard';
// import './outflows.css'

// let url = 'http://localhost:3000/api/v1/cost';

// function Outflows() {

//     const [loading, setLoading] = useState(false);
//     const [outflows, setOutflows] = useState([]);

//     const getOutflows = async () => {
//         setLoading(true);
//         const response = await fetch(url);
//         const outflows = await response.json();
//         console.log(outflows);
//         setOutflows(outflows.data.costs);
//         setLoading(false);
//     }

//     useEffect(() => {
//         getOutflows();
//     }, []);

//     return (
//         <>
//             <table className='table m-auto'>
//                 <thead className='thead text-center'>
//                     <tr>
//                         <th></th>
//                         <th>Description</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                         <th>Outflows</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                 {!loading ?
//                         outflows.map((data) => (
//                             <OutflowsCard
//                                 key={data._id}
//                                 data={data}
//                             />

//                         ))
//                         : <tr><td className='loader'>Loading...</td></tr>
//                     }
//                 </tbody>
//             </table>
//             <div className='pe-5 text-end'>
//             <span>{outflows.length} Results</span>
//             </div>
//         </>
//     )
// }

// export default Outflows