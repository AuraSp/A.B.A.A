import React, { useState, useEffect } from 'react';
import UserDataCard from './UserDataCard';
import EditUserDataForm from './EditUserDataForm';
import './activitiesmain.css';

let url = 'http://localhost:3000/api/v1/users/';

function MainTable({ setAllData }) {

    const [loading, setLoading] = useState(true);
    let [editId, setEditId] = useState('');
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);
    const [userId, setId] = useState([]);

    //---FetchData---//
    const getUserTransactions = async () => {
        const response = await fetch(url);
        const userdata = await response.json();
        setId(userdata.data.transactions.map((data) => data._id));
        setIncomes(...userdata.data.transactions.map((data) => data.income));
        setExpenses(...userdata.data.transactions.map((data) => data.expense));
        setLoading(false);
    }

    useEffect(() => {
        getUserTransactions();

    }, []);

    useEffect(() => {
        let tempAll = [...incomes, ...expenses];
        setAll(tempAll, userId);
        setAllData(tempAll);
    }, [incomes, expenses])

    function handleDelete(e, userId, id) {
        e.preventDefault();
        // const dlt = userId.filter((data) => data._id !== id);
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'DELETE',
        })
            .then(() => console.log()
            )
    }

    // //---OpenEditForm---//
    // const handleEdit = (e, data) => {
    //     e.preventDefault();

    //     console.log(data)
    // };

    //---HandleStudentEdit---//
    const submitEdit = (e, id, description, category, date, amount) => {

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
        // console.log(editId)
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
                                        // onEdit={handleEdit}
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