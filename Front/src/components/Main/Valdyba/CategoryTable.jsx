import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'
import { updateCategory, getAllCategories, deleteCategory } from '../../../api/lib/CategoriesAPI';

function CategoryTable({ setAll, categoryId, all, setRender, userId }) {

    const [editId, setEditId] = useState([]);
    // let [categories, setCategories] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {
        await updateCategory(id, subId, data).then(() =>
            getAllCategories()
        );
        setRender(prevState => !prevState)
        setEditId()
        const postToLogs = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                text: 'edited category',
                value: "Atnaujino",
            })
        };
        fetch('http://localhost:3000/api/v1/logs/addNewLog', postToLogs)
    }


    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    const handleDelete = (e, data, subId, id) => {
        e.preventDefault();
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
                            title: 'Jūsų kategorijų įrašas sėkmingai pašalintas!',
                            icon: 'success',
                            confirmButtonText: 'Puiku!'
                        })
                    const postToLogs = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: userId,
                            text: 'delete category',
                            value: "Ištrynė",
                        })
                    };
                    fetch('http://localhost:3000/api/v1/logs/addNewLog', postToLogs)

                    deleteCategory(subId) //Delete choosen transaction type form database;
                    setAll(all.filter((data) => data._id !== subId))
                    setRender(prevState => !prevState)
                } else if (result.isDenied) {
                    Swal.close()
                }
            })
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

    all.sort(sortByDate);
    return (

        <>
            <table className='table table-borderless mx-auto'>
                <thead className='thead text-center'>
                    <tr className='text-secondary'>
                        <th>Kategorijos pavadinimas</th>
                        <th className='text-secondary'>
                            <span>{all.length} {all.length < 10 && all.length > 1 ? 'Kategorijos' : all.length === 1 ? 'Kategorija' : 'Kategorijų'}</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {all.map((data) => (
                        <React.Fragment key={data._id}>
                            {data.value === "" ? (
                                <></>
                            ) : (
                                editId === data._id ? (
                                    <EditCategory
                                        subId={data._id}
                                        id={categoryId}
                                        defaultData={data}
                                        onCancel={cancelEdit}
                                        onSubmit={submitEdit}
                                    />
                                ) : (
                                    <ListCategory
                                        key={data._id}
                                        subId={data._id}
                                        defaultData={data}
                                        value={data.value}
                                        text={data.text}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                )
                            )
                            }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    )

}

export default CategoryTable