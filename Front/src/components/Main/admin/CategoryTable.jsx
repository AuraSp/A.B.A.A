import React, {useState, useEffect} from 'react'
import ListCategory from './ListCategory'
import EditCategory from './EditCategory'

function CategoryTable() {

    const [editId, setEditId] = useState([]);
    let [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        fetch('http://localhost:3000/api/v1/categories')
        .then(res => res.json())
        .then((json) => {
            setCategories(json.data.categories);
        })
    }

    useEffect( ()=>{
      getAllCategories();
    }, [])

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

    //---HandleDelete---//
    const handleDelete = (_id) => {
        fetch(`http://localhost:3000/api/v1/cateories/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
        });
      };
    
    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    
    const taskData = categories.map((data) => {
        return (
            <>
                {data.value === "" ?(
                        <></>
                    ) : (
                        <React.Fragment key={data._id}>
                        {editId === data._id ? (
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
                                    onDelete={handleDelete}
                                />
                            )
                        }
                        </React.Fragment>
                    )
                }
            </>
        );
      });
      return <>{taskData}</>;
}

export default CategoryTable