import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import UserList from './UserList'
import { deleteUserById } from '../../../api/lib/TransactionsAPI';

function UserTable({all, userId, setAll, setRender}) {

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
                                title: 'Vartotojo įrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })
                        deleteUserById(subId)
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
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų vartotojų</p>
        ) : (
            <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Slapyvardis</th>
                        <th>Email</th>
                        <th>Registracijos data</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (
                       
                        <UserList
                            key = {data._id}
                            subId = {data._id}
                            user = {data.username}
                            email = {data.email}
                            createdAt = {data.createdAt}
                            roles={data.roles}
                            defaultData = {data}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
            </>
            )}
        </>
    );
}

export default UserTable