import React, {useState, useEffect} from 'react'
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'
import { updateCategory, getAllCategories } from '../../../api/lib/CategoriesAPI';

function CategoryTable({setAll, categoryId, all, setRender}) {

    const [editId, setEditId] = useState([]);
    let [categories, setCategories] = useState([]);

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
    }


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
                                id={categoryId}
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