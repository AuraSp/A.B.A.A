import React, { useState, useEffect } from 'react';
import UserDataCard from './UserDataCard';
import EditUserDataForm from './EditUserDataForm';

import './activitiesmain.css';

let url = 'http://localhost:3000/api/v1/users/';

function MainTable() {

    const [loading, setLoading] = useState(false);
    const [userdata, setData] = useState([]);
    let [editId, setEditId] = useState('');
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);

    //---FetchData---//
    const getUserTransactions = async () => {
        setLoading(true);
        const response = await fetch(url);
        const userdata = await response.json();
        setIncomes(...userdata.data.transactions.map((data) => data.income));
        setExpenses(...userdata.data.transactions.map((data) => data.expenses));
        setLoading(false);
    }

    useEffect(() => {
        getUserTransactions()
    }, []);

    all.push(...incomes, ...expenses);

    function handleDelete(e, id) {
        e.preventDefault()
        const dlt = all.filter((data) => data._id !== id);
        setAll(dlt);
        setData(dlt);
        console.log(all)
        fetch(`http://localhost:3000/api/v1/users/${id}`, {
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
        // fetch(url + editId, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         description: description,
        //         category: category,
        //         date: date,
        //         inamount: amount
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //         getInflows()
        //         cancelEdit();
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     })
        console.log(editId)
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
                            <span>{all.length} Results</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {!loading ?
                        all.map((data) => (
                            <>
                                {editId === data._id ? (
                                    <EditUserDataForm
                                        key={data._id}
                                        data={data}
                                        onCancel={cancelEdit}
                                         onSubmit={submitEdit}
                                        editId={editId}
                                    />
                                ) : (
                                    <UserDataCard
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

export default MainTable