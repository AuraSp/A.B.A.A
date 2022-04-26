import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserDataCard from './UserDataCard';
import EditUserDataForm from './EditUserDataForm';
import { deleteIncomeTransactions, deleteExpenseTransactions, getAllUsers } from '../../../api/lib/TransactionsAPI';
import './activitiesmain.css';

function MainTable({ setAllData }) {

    const [loading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);
    const [userId, setId] = useState([]);

    //---FetchData---//
    useEffect(() => {
        getAllUsers().then((res) => {
            const userdata = res.data.data.transactions; //Fetch all existing data from database
            setId(...userdata.map((data) => data._id)); //Take User Id
            setIncomes(...userdata.map((data) => data.income)); //Take all User's incomes
            setExpenses(...userdata.map((data) => data.expense)); //Take all User's expenses
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        let tempAll = [...incomes, ...expenses]; //Put all taken incomes and expenses into new temporarily Object
        setAll(tempAll); //Give empty Object all temporarily data(everything inside it)
        setAllData(tempAll); //Give empty Object all temporarily data(everything inside it) - to give data for creating
    }, [incomes, expenses])


    //---Delete by ID---//
    const handleDelete = async (e, data, subId) => {
        e.preventDefault();
        if (data.type === 'income') {
            console.log(data.type) //Check type
            Swal
                .fire({
                    title: 'Are you sure?',
                    text: 'This data will be lost forever',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire('Your income has been removed succesfully!', '', 'success')

                        setAll(all.filter((data) => data._id !== subId)); //Delete choosen transaction type from users eyes

                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
            await deleteIncomeTransactions(userId, subId) //Delete choosen transaction type form database
        } else {
            console.log(data.type) //Check type
            Swal
                .fire({
                    title: 'Are you sure?',
                    text: 'This data will be lost forever',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire('Your expense has been removed succesfully!', '', 'success')

                        setAll(all.filter((data) => data._id !== subId)); //Delete choosen transaction type from users eyes

                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
            await deleteExpenseTransactions(userId, subId) //Delete choosen transaction type form database
        }
    }
    
    //---OpenEditForm---//
    const handleEdit = (e, userId) => {
        e.preventDefault();
        setId(userId); //Open edit form on choosen transaction type
        console.log(userId)
    };


    //---HandleEdit---//
    const submitEdit = (e, userId, subId) => {
        e.preventDefault();
        console.log(userId)
    }


    //---CancelEdit---//
    function cancelEdit() {
        setId('')
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
                                {userId === data._id ? (
                                    <EditUserDataForm
                                        key={data._id}
                                        subId={data._id}
                                        data={data}
                                        onCancel={cancelEdit}
                                        onSubmit={submitEdit}
                                    />
                                ) : (
                                    <UserDataCard
                                        key={data._id}
                                        subId={data._id}
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