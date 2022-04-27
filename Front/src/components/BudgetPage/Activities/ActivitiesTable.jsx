import React, { useState, useEffect } from 'react';
import AllFlowsCard from './AllFlowsCard';
import EditFlowsForm from './EditFlowsForm';

import './activitiesmain.css';


let url = 'http://localhost:3000/api/v1/income/';
let url2 = 'http://localhost:3000/api/v1/outcome/';

function ActivitiesTable() {

    const [loading, setLoading] = useState(false);
    const [allflows, setAllflows] = useState([]);
    let [editId, setEditId] = useState('');

    //---FetchData---//
    const getInflows = async () => {
        setLoading(true);
        const response = await fetch(url);
        const allflows = await response.json();
        console.log(allflows);
        setAllflows(allflows.data.incomes);
        setLoading(false);
    }

    // const getOutflows = async () => {
    //     setLoading(true);
    //     const response = await fetch(url2);
    //     const allflows = await response.json();
    //     console.log(allflows);
    //     setAllflows(allflows.data.outcomes);
    //     setLoading(false);
    // }

    useEffect(() => {
        // getOutflows();
        getInflows();
    }, []);

    function handleDelete(e, id, data) {
        e.preventDefault()
        const dlt = allflows.filter((data) => data._id !== id);
        setAllflows(dlt);
        fetch(`http://localhost:3000/api/v1/income/${id}`, {
            method: 'DELETE'
        })
            .then(() => console.log('success'));
    }


    //---OpenEditForm---//
    const handleEdit = (e, data) => {
        e.preventDefault();
        setEditId(data._id);
    };

    //---HandleStudentEdit---//
    const submitEdit = (e, description, category, date, amount) => {
        e.preventDefault();
        fetch(url + editId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: description,
                category: category,
                date: date,
                inamount: amount
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getInflows()
                cancelEdit();
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    //---CancelStudentEdit---//
    function cancelEdit() {
        setEditId('')
        console.log('canceling')
    }

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
                        <th className='text-muted'>
                            <span>{allflows.length} Results</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {!loading ?
                        allflows.map((data) => (
                            <>
                                {editId === data._id ?
                                    <EditFlowsForm
                                        key={data._id}
                                        data={data}
                                        onCancel={cancelEdit}
                                        onSubmit={submitEdit}
                                        editId={editId}
                                    />
                                    : (
                                        <AllFlowsCard
                                            key={data._id}
                                            id={data._id}
                                            data={data}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    )}
                            </>
                        ))
                        : <tr><td className='loader'>Loading...</td></tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default ActivitiesTable