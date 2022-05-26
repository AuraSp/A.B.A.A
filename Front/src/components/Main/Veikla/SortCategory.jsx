import React, { useState, useEffect } from 'react';
import './Styles/maincontent.css';

function SortCategory({ setCategory }) {

  let [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true)

  const getAllCategories = async () => {
    fetch('http://localhost:3000/api/v1/categories')
      .then(res => res.json())
      .then((json) => {
        setCategories(json.data.categories[0].category);
        setLoad(false)
      })
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <label className='text-center'><h6>Pagal kategoriją</h6></label>
      {!load && <select
        onChange={(e) => setCategory(e.target.value)}
        defaultValue=''
        className='btn border-1 border-secondary p-2'>
        <option value='' disabled>--Pasirinkite kategoriją--</option>
        {categories.map(item => {
          return (<option key={item._id} value={item.value}>{item.value}</option>)
        })}
      </select>
      }
    </div>
  )
}

export default SortCategory