import React, { useState, useEffect, Fragment } from 'react';
import OutflowsCard from './OutflowsCard';
import GetOutflowsCard from './GetOutflowsCard'
import './outflows.css'

let url = 'http://localhost:3000/api/v1/cost/';

function Outflows() {

    const [loading, setLoading] = useState(false);
    const [outflows, setOutflows] = useState([]);
    const [editOutflowsId, setEditOutflowsId] = useState(null);


    const getOutflows = async () => {
        setLoading(true);
        const response = await fetch(url);
        const outflows = await response.json();
        console.log(outflows);
        setOutflows(outflows.data.costs);
        setLoading(false);
    }

    useEffect(() => {
        getOutflows();
    }, []);

        // Editing

    const handleEditClick = (event, data) => {
        event.preventDefault();
        setEditOutflowsId(data._id);

        const formValues = {
            description: data.description,
            category: data.category,
            date: data.date,
            amount: data.amount,
        }
        setEditFormData(formValues);
    }
        
    const [editFormData, setEditFormData] = useState({
        description: "",
        category: "",
        date: "",
        amount: "",
      });

      const submitEdit = (e, description, category, date, amount) => {
        e.preventDefault();
        fetch(url + editOutflowsId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: description,
                category: category,
                date: date,
                amount: amount
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

    //   Cancel Editing
    const handleCancelClick = () => {
        setEditOutflowsId(null);
      };

    return (
        <>
            <table className='table m-auto'>
                <thead className='thead text-center'>
                    <tr>
                        <th></th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Outflows</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                {!loading ?
                    outflows.map((data) => (
                        <Fragment>
                            {editOutflowsId === data._id ? (
                                <GetOutflowsCard
                                    key={data.id}
                                    data={data}
                                    editFormData={editFormData}
                                    onSubmit={submitEdit}
                                    handleCancelClick={handleCancelClick}
                                />
                                ) : (
                                <OutflowsCard
                                    outflows={outflows}
                                    key={data.id}
                                    id={data.id}
                                    data={data}
                                    handleEditClick={handleEditClick}
                                />)
                            }
                        </Fragment>
                    ))
                        : <tr><td className='loader'>Loading...</td></tr>
                    }
                </tbody>
            </table>
            <div className='pe-5 text-end'>
            <span>{outflows.length} Results</span>
            </div>
        </>
    )
}

export default Outflows