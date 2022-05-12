import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserDataCard from './UserDataCard';
import EditUserDataForm from './EditUserDataForm';
import { deleteIncomeTransactions, deleteExpenseTransactions, getAllUsers, findIncomesAndUpdate, findExpensesAndUpdate } from '../../../api/lib/TransactionsAPI';
import './activitiesmain.css';

function MainTable({ setAllData, render, setRender }) {

    const [loading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);
    const [editId, setEditId] = useState([]);
    const [userId, setId] = useState([]);


    let text = localStorage.getItem("user");
    let obj = JSON.parse(text)


    //---FetchData---//
    useEffect(() => {
        getAllUsers().then((res) => {

            const userdata = res.data.data.transactions; //Fetch all existing data from database
            let userAllIds = userdata.filter((data) => data._id === obj); //Take All users Ids
            setEditId(...userAllIds.map((data) => data._id === obj)); //Take User Id for edit

            setId(...userAllIds.map((data) => data._id)); //Take User Id
            setIncomes(...userAllIds.map((data) => data.income)); //Take all User's incomes
            setExpenses(...userAllIds.map((data) => data.expense)); //Take all User's expenses
            setLoading(false);
        });
    }, [render]);
    console.log(userId, incomes, expenses)

    useEffect(() => {
        let tempAll = [...incomes, ...expenses]; //Put all taken incomes and expenses into new temporarily Object
        setAll(tempAll); //Give empty Object all temporarily data(everything inside it)
        setAllData(tempAll); //Give empty Object all temporarily data(everything inside it) - to give data for creating
    }, [incomes, expenses])

    //---Delete by ID---//
    const handleDelete = (e, data, subId) => {
        e.preventDefault();
        if (data.type === 'income') {
            console.log(data.type) //Check type
            Swal
                .fire({
                    title: 'Ar tikrai norite pašalinti?',
                    text: 'Šio įrašo informacija bus prarasta negražinamai',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Atšaukti',
                    confirmButtonText: 'Panaikinti',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire({
                                title: 'Jūsų pajamų įrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })

                        setAll(all.filter((data) => data._id !== subId)); //Delete choosen transaction type from users eyes

                        deleteIncomeTransactions(userId, subId) //Delete choosen transaction type form database
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
        } else {
            console.log(data.type) //Check type
            Swal
                .fire({
                    title: 'Ar tikrai norite pašalinti?',
                    text: 'Šio išrašo informacija bus prarasta negražinamai',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Atšaukti',
                    confirmButtonText: 'Panaikinti',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire({
                                title: 'Jūsų išlaidų išrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })

                        setAll(all.filter((data) => data._id !== subId)); //Delete choosen transaction type from users eyes

                        deleteExpenseTransactions(userId, subId)
                        //Delete choosen transaction type form database
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
        }
    }

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };


    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {
        console.log(id, subId, data)
        await findIncomesAndUpdate(id, subId, data).then(() =>
            getAllUsers());
        await findExpensesAndUpdate(id, subId, data).then(() =>
            getAllUsers());

        setRender(prevState => !prevState)
    }


    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    function sortByDate(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }

    //---SortByCreationDate---//
    all.sort(sortByDate);

    


    return (
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
                <div className='d-flex flex-row flex-nowrap w-100 text-center'> {/*main exp*/}
                    <div>
                        <span className='p-0 m-0 text-secondary'>Pajamos</span> {/* exp*/}
                    </div>
                    <div>
                        <span className='p-0 m-0 text-secondary'>Išlaidos</span> {/* exp*/}
                    </div>
                </div>
                <table className='table table-borderless m-auto'>
                    <thead className='thead text-center'>
                        <tr className='text-secondary'>
                            <th></th>
                            <th>Aprašymas</th>
                            <th>Kategorija</th>
                            <th>Data</th>
                            <th>Pajamos</th>
                            <th>Išlaidos</th>
                            <th className='text-muted'>
                                <span>{all.length} {all.length < 10 && all.length > 1 ? 'Rezultatai' : all.length === 1 ? 'Rezultatas' : 'Rezultatų'}</span>
                            </th>
                        </tr >
                    </thead >
                    <tbody className='text-center'>
                       
                        {!loading ?
                            all.map((filterData) => (

                                <React.Fragment key={filterData._id}>

                                    {editId === filterData._id ? (
                                        <EditUserDataForm
                                            subId={filterData._id}
                                            id={userId}
                                            defaultData={filterData}
                                            onCancel={cancelEdit}
                                            onSubmit={submitEdit}
                                        />
                                    ) : (
                                        <UserDataCard
                                            subId={filterData._id}
                                            data={filterData}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />

                                    )}
                                    

                                </React.Fragment>
                            ))
                            : <tr><td className='loader'>Laukiama...</td></tr>
                        }
                    </tbody>
                </table >
            </>
        )
        }
        </>
    )
}

export default MainTable