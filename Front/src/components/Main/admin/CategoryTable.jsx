import React, {useState, useEffect} from 'react'
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'
import { updateCategories } from '../../../api/lib/CategoriesAPI';

function CategoryTable({setAll, all, setRender}) {

    const [editId, setEditId] = useState([]);
    let [categories, setCategories] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    // const submitEdit = async (_id, subId, data) => {
    //     fetch(`http://localhost:3000/api/v1/cateories/${_id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }).then((res) => {
    //       console.log(res);
    //     });
    // }

    // //---HandleDelete---//
    // const handleDelete = (_id) => {
    //     fetch(`http://localhost:3000/api/v1/cateories/${_id}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }).then((res) => {
    //       console.log(res);
    //     });
    //   };
    
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

      all.sort(sortByDate);
    return (
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
            <table>
                <thead>
                    <tr>
                        <th>Reikšmė</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (
                        <React.Fragment key={data._id}>
                        {data.value === "" ? (
                                <></>
                        ) : (
                            editId === data._id ? (
                                <EditCategory
                                    subId ={data._id}
                                    defaultData={data}
                                    onCancel={cancelEdit}
                                    // onSubmit={submitEdit}
                                />
                            ) : (
                                <ListCategory
                                    key={data._id}
                                    subId ={data._id}
                                    defaultData={data}
                                    value={data.value}
                                    text={data.text}
                                    onEdit={handleEdit}
                                    // onDelete={handleDelete}
                                />
                            )
                        )
                        }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </>
            )}
        </>
    );
}

export default CategoryTable