import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import UserList from './UserList'
import { deleteUserById, updateUser, getAllUsers } from '../../../api/lib/TransactionsAPI';
import EditUserList from './EditUserList'

function UserTable({all, userId, setAll, setRender}) {

    const [editId, setEditId] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    const submitEdit = async (data, subId) => {
        await updateUser(subId, data).then(() =>
            getAllUsers()
        );
        setRender(prevState => !prevState)
        setEditId()
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

  
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Slapyvardis</th>
                        <th>Email</th>
                        <th>Slaptažodis</th>
                        <th>Registracijos data</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (

                        <React.Fragment key={data._id}>
                        {editId === data._id ? (
                            <EditUserList
                                subId ={data._id}
                                id={userId}
                                defaultData={data}
                                onCancel={cancelEdit}
                                onSubmit={submitEdit}
                            />
                        ) : (
                            <UserList
                                key = {data._id}
                                userId ={data._id}
                                subId = {data._id}
                                user = {data.username}
                                email = {data.email}
                                password = {data.password}
                                createdAt = {data.createdAt}
                                roles={data.roles}
                                defaultData = {data}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
 
    )
}

export default UserTable