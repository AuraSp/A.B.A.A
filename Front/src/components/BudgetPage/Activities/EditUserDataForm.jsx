import React, { useState } from 'react';
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";

import './activitiesmain.css';

function EditUserDataForm({ editId, data, onCancel, onSubmit }) {
    const [description, setDescription] = useState(data.description)
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);
    const [inamount, setInamount] = useState(data.inamount);

    const editFlows = (e) => {
        e.preventDefault();
        onSubmit(e, description, category, date, inamount)
    }

    return (
        <tr className='editinputs text-center'>
            <td className='fs-5 cardicons'><MdInventory className='p-1 fs-3'/></td>
            <td>
                <input
                    className='w-75 text-center'
                    type='text'
                    defaultValue={data.description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </input>
            </td>
            <td>
                <select
                    className='w-75 text-center'
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={data.category}>
                    <option value='' disabled>--Choose your category--</option>
                    <option value='Food'>Food</option>
                    <option value='Rent'>Rent</option>
                </select>
            </td>
            <td>
                <input
                    className='w-75 text-center'
                    type='text'
                    defaultValue={data.date}
                    onChange={(e) => setDate(e.target.value)}>
                </input>
            </td>
            <td>
                <input
                    className='w-75 text-center'
                    type='text'
                    defaultValue={data.inamount}
                    onChange={(e) => setInamount(e.target.value)}>
                </input>

            </td>
            < td className='editbuttons' >
                <button onClick={() => onCancel()} className='btn btn-danger border-0 me-1'><MdCancel /></button>
                <button onClick={(e) => editFlows(e)} className='btn btn-secondary border-0 me-1'><MdOutlineCheckBox /></button>
            </td >
        </tr >
    )
}

export default EditUserDataForm