import React, { useState } from 'react';
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";

import './activitiesmain.css';

function EditUserDataForm({ defaultData, id, subId, onCancel, onSubmit }) {
    const [description, setDescription] = useState(defaultData.description)
    const [category, setCategory] = useState(defaultData.category);
    const [date, setDate] = useState(defaultData.date);
    const [amount, setAmount] = useState(defaultData.amount);

    const editFlows = () => {
        let dataSet = {
            description: description,
            category: category,
            date: date,
            amount: amount,
        };
        onSubmit(id, subId, dataSet, defaultData)
    }

    return (
        <tr className='editinputs text-center'>
            <td className='fs-5 cardicons'><MdInventory className={defaultData.type === 'income' ? 'bg-primary p-1 fs-3 text-warning' : 'bg-danger p-1 fs-3 text-warning'} /></td>
            <td>
                <input
                    className='w-75 text-center'
                    type='text'
                    defaultValue={defaultData.description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </input>
            </td>
            <td>
                <select
                    className='w-75 text-center'
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value={defaultData.category}>{defaultData.category}</option>
                    <option value='Food'>Food</option>
                    <option value='Rent'>Rent</option>
                </select>
            </td>
            <td>
                <input
                    className='w-75 text-center'
                    type='text'
                    defaultValue={defaultData.date.slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}>
                </input>
            </td>
            {defaultData.type === 'income' ? (
                <>
                    <td>
                        <input
                            className='w-75 text-center'
                            type='number'
                            defaultValue={defaultData.amount}
                            onChange={(e) => setAmount(e.target.value)}>
                        </input>
                    </td >
                    <td className='fw-bold fs-5'>-</td>
                </>
            ) : (
                <>
                    <td className='fw-bold fs-5'>-</td>
                    <td>
                        <input
                            className='w-75 text-center'
                            type='number'
                            defaultValue={defaultData.amount}
                            onChange={(e) => setAmount(e.target.value)}>
                        </input>
                    </td>
                </>
            )
            }
            < td className='editbuttons' >
                <button onClick={() => onCancel()} className='btn btn-danger border-0 me-1'><MdCancel /></button>
                <button onClick={(e) => editFlows(e)} className='btn btn-secondary border-0 me-1'><MdOutlineCheckBox /></button>
            </td >
        </tr >
    )
}

export default EditUserDataForm