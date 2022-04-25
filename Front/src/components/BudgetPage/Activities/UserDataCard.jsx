import React from 'react';
import { AiFillTags, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import './activitiesmain.css';

function UserDataCard({ subId, data, onEdit, onDelete }) {
    return (
        <tr>
            <td className='fs-5 cardicons'><AiFillTags className={data.type === 'income' ? 'bg-primary p-1 fs-3' : 'bg-danger p-1 fs-3'} /></td>
            <td>{data.description}</td>
            <td>{data.category}</td>
            <td>{data.date}</td>
            <td>{data.income}</td>
            <td>{data.expense}</td>
            <td className='buttons'>
                <button onClick={(e) => onDelete(e, data, subId)} className='btn border-0 me-1'><MdDelete /></button>
                <button onClick={(e) => onEdit(e, subId)} className='btn border-0 me-1'><AiFillEdit /></button>
            </td>
        </tr>

    )
}

export default UserDataCard