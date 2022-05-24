import React, {useState, useEffect} from 'react';
import './activitiesmain.css';

function SortCategory({setCategory}) {

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

  return (
    <>
      <label className='text-start'>Kategoriją</label>
      <select
        // defaultValue={categories}
        onChange={(e) => setCategory(e.target.value)}
        className=''>
        <option value='' disabled>--Pasirinkite kategoriją--</option>
        {categories.map(item => {
          return (<option key={item.value} value={item.value}>{item.text}</option>)
        })}
      </select>
  </>
  )
}

export default SortCategory