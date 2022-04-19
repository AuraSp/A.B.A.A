import React from 'react'
import { useState } from 'react';
import { AiFillTags } from "react-icons/ai";
import './outflows.css'

function GetOutflowsCard({ data, handleCancelClick, onSubmit }){
    const [description, setDescription] = useState(data.description)
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);
    const [amount, setAmount] = useState(data.amount);

    const editOutflows = (e) => {
        e.preventDefault();
        onSubmit(e, description, category, date, amount);
    }

    function refreshPage() {
        window.location.reload(false);
      }

  return (
        <tr>
            <td className='fs-5'><AiFillTags /></td>
            <td>
                <input 
                    type="text" 
                    defaultValue={data.description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </td>
            <td>
                <input 
                    type="text" 
                    defaultValue={data.category} 
                    onChange={(e) => setCategory(e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="text" 
                    defaultValue={data.date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
            </td>
            <td>
                <input 
                    type="text" 
                    defaultValue={data.amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </td>
            <td></td>
            <td>
                <button onClick={(e) => editOutflows(e, refreshPage())} className='btn btn-danger border-0 text-warning me-1'>save</button>
                <button onClick={(e) => handleCancelClick(e)} className='btn btn-secondary border-0 text-warning ms-1'>cancel</button>
            </td>
        </tr >
  );
};

export default GetOutflowsCard