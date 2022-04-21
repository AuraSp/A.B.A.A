import React from 'react';
import { AiFillTags, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import './activitiesmain.css';

function UserDataCard({ id, data, onEdit, onDelete }) {

    return (
        <tr>
            <td className='fs-5 cardicons'><AiFillTags className={data.type === 'income' ? 'bg-danger p-1 fs-3' : 'bg-primary p-1 fs-3'} /></td>
            <td>{data.description}</td>
            <td>{data.category}</td>
            <td>{data.date}</td>
            <td>{data.income}</td>
            <td>{data.expense}</td>
            <td className='buttons'>
                <button onClick={(e) => onDelete(e, id)} className='btn border-0 me-1'><MdDelete /></button>
                <button onClick={(e) => onEdit(e, data)} className='btn border-0 me-1'><AiFillEdit /></button>
            </td>
        </tr >

    )
}

export default UserDataCard