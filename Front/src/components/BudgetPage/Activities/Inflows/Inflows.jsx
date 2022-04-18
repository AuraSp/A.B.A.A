import React, { useState, useEffect } from 'react';
import InflowsCard from './InflowsCard';
import './inflows.css';


let url = 'http://localhost:3000/api/v1/income';
let url2 = 'http://localhost:3000/api/v1/outcome';

function Inflows() {

    const [loading, setLoading] = useState(false);
    const [inflows, setInflows] = useState([]);

    const getInflows = async () => {
        setLoading(true);
        const response = await fetch(url);
        const inflows = await response.json();
        console.log(inflows);
        setInflows(inflows.data.incomes);
        setLoading(false);
    }

    const getOutflows = async () => {
        setLoading(true);
        const response = await fetch(url2);
        const inflows = await response.json();
        console.log(inflows);
        setInflows(inflows.data.outcomes);
        setLoading(false);
    }

    useEffect(() => {
        getOutflows();
        getInflows();
    }, []);

    return (
        <>
            <table className='table table-borderless m-auto'>
                <thead className='thead text-center'>
                    <tr className='text-secondary'>
                        <th></th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Inflows</th>
                        <th>Outflows</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {!loading ?
                        inflows.map((data) => (
                            <InflowsCard
                                key={data._id}
                                data={data}
                            />

                        ))
                        : <tr><td className='loader'>Loading...</td></tr>
                    }
                </tbody>
            </table>
            <div className='pe-5 text-end'>
                {/* <span>{inflows.length} Results</span> */}
            </div>
        </>
    )
}

export default Inflows