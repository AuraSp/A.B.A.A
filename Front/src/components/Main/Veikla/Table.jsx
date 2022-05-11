import React from 'react';
import Swal from 'sweetalert2';
import Card from './Card';
import EditForm from './EditForm';
import { getAllUsers, deleteIncomeTransactions, deleteExpenseTransactions, findIncomesAndUpdate, findExpensesAndUpdate } from '../../../api/lib/TransactionsAPI';
// import ApexCharts from '../Charts/ActivitiesChart';
import series from '../Charts/ActivitiesChart';
import SetSeries from '../Charts/ActivitiesChart';
import './Styles/table.css';

function Table({ setAll, all, setEditId, editId, userId, loading, setRender, filterCategory, firstDate, lastDate }) {


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

                        deleteIncomeTransactions(userId, subId).then(() => SetSeries(series)) //Delete choosen transaction type form database

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
            getAllUsers()
        );

        await findExpensesAndUpdate(id, subId, data).then(() =>
            getAllUsers());

        setRender(prevState => !prevState)
    }


    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    //---SortByCreationDate---//
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

    console.log(all.map((filterData) => !firstDate && !lastDate && filterData.category === filterCategory && filterData.type === "expense"
    || !filterCategory && filterData.date >= firstDate && filterData.date <= lastDate && filterData.type === "expense" 
    || filterData.category === filterCategory && filterData.type === "expense" && filterData.date >= firstDate && filterData.date <= lastDate ? "yes" : "no" ))


    console.log("Pradzia: " + firstDate);
    console.log("Pabaiga: " + lastDate);

    return (
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
                <div className='d-flex flex-row flex-nowrap justify-content-end w-100 pb-2 pt-2 main-exp'>
                    <div>
                        <span className='p-0 m-0 text-secondary'>Pajamos</span> {/* exp*/}
                    </div>
                    <div>
                        <span className='p-0 m-0 text-secondary'>Išlaidos</span> {/* exp*/}
                    </div>
                </div>
                <table className='table table-borderless mx-auto'>
                    <thead className='thead text-center'>
                        <tr className='text-secondary'>
                            <th></th>
                            <th>Aprašymas</th>
                            <th>Kategorija</th>
                            <th>Data</th>
                            <th>Pajamos</th>
                            <th>Išlaidos</th>
                            <th className='text-secondary'>
                                <span>{all.length} {all.length < 10 && all.length > 1 ? 'Rezultatai' : all.length === 1 ? 'Rezultatas' : 'Rezultatų'}</span>
                            </th>
                        </tr >
                    </thead >
                    <tbody className='text-center'>
                        {!loading ?
                            all.map((filterData) => (

                                <React.Fragment key={filterData._id}>
                                    {editId === filterData._id ? (
                                        <EditForm
                                            subId={filterData._id}
                                            id={userId}
                                            defaultData={filterData}
                                            onCancel={cancelEdit}
                                            onSubmit={submitEdit}
                                        />
                                    ) : (!filterCategory  ? (
                                        <Card
                                            subId={filterData._id}
                                            data={filterData}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ) : (
                                        !firstDate && !lastDate && filterData.category === filterCategory && filterData.type === "expense"
                                        || filterData.date >= firstDate && filterData.date <= lastDate && filterData.type === "expense" 
                                        || filterData.category === filterCategory && filterData.type === "expense" && filterData.date >= firstDate && filterData.date <= lastDate ? (
                                            <Card
                                                subId={filterData._id}
                                                data={filterData}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        ) : (
                                            <></>
                                        )
                                    )
                                    )
                                    }
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

export default Table