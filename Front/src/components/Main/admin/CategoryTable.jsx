import React, {useState, useEffect} from 'react'
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'
import { updateCategories } from '../../../api/lib/TransactionsAPI';

function CategoryTable({setAll}) {

    const [editId, setEditId] = useState([]);
    let [categories, setCategories] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    const submitEdit = async (_id, subId, data) => {
        fetch(`http://localhost:3000/api/v1/cateories/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
        });
    }

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

    
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Reikšmė</th>
                    <th>tekstas</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.map((data) => (
                    <React.Fragment key={data._id}>
                    {data.value === "" ? (
                            <></>
                    ) : (
                        editId === data._id ? (
                            <EditCategory
                                subId ={data._id}
                                defaultData={data}
                                onCancel={cancelEdit}
                                onSubmit={submitEdit}
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
    );
}

export default CategoryTable