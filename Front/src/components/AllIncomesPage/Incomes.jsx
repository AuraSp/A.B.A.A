import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import IncomesCard from './IncomesCard';

function Incomes() {
    const [loading, setLoading] = useState(false);
    const [incomes, setIncomes] = useState([]);

    let url = 'http://localhost:3000/api/v1/income';

    const getIncomes = async () => {
        setLoading(true);
        const response = await fetch(url);
        const incomes = await response.json();
        console.log(incomes);
        setIncomes(incomes.data.incomes);
        setLoading(false);
    };
    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <div className='row'>
            <div>
                <Link to="/" className='p-3 fs-4'>Home</Link>
                <Link to="/incomeform" className='p-3 fs-4'>Add new income</Link>
            </div>
            <table className='border border-2 text-center'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {!loading ?
                        incomes.map((data) => (
                            <IncomesCard
                                key={data._id}
                                data={data}
                            />

                        ))
                        : <tr><td className='loader'>Loading...</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Incomes