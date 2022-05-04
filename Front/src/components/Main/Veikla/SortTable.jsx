import React, {useState} from 'react';
import './activitiesmain.css';

function SortTable() {

  const [categor, setQ] = useState('');
  console.log(categor);

  const options = [
    { value: 'Išsiėmimas', text: 'Pinigų išsiėmimas' },
    { value: 'Drabužiai', text: 'Rūbai/Batai' },
    { value: 'Maistas/Gėrimai', text: 'Maistas/Gėrimai' },
    { value: 'Elektronika', text: 'Elektronika' },
    { value: 'Dovanos', text: 'Dovanos' },
    { value: 'Namų priežiūra', text: 'Namų priežiūra' },
    { value: 'Sąskaitos/Mokesčiai', text: 'Sąskaitos/Mokesčiai' },
    { value: 'Nuoma', text: 'Namo nuoma' },
    { value: 'Santaupos', text: 'Santaupos' },
    { value: 'Alga', text: 'Alga' }
]



  return (
    <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow text-muted d-flex flex-row'>
      <label className='text-start'>Kategoriją</label>
      <select
          defaultValue={categor}
          onChange={(e) => setQ(e.target.value)}
          className=''>
          <option value='' disabled>--Pasirinkite kategoriją--</option>
          {options.map(item => {
              return (<option key={item.value} value={item.value}>{item.text}</option>)
          })}
      </select>
    </div>
  )
}

export default SortTable