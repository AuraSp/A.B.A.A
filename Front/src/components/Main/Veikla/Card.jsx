import React, { useState } from 'react';
import { AiFillTags, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";


import './Styles/card.css';

function Card({ subId, data, onEdit, onDelete }) {
    const [toolspopup, setToolsPopUp] = useState(false);

    const toggleToolsPopUp = () => {
        setToolsPopUp(!toolspopup)
    }
    return (
        <tr>
            <td className='fs-5 cardicons'><AiFillTags className={data.type === 'income' ? 'bg-primary text-yellow p-1 fs-3' : 'bg-danger text-yellow p-1 fs-3'} /></td>
            <td>{data.description}</td>
            <td>{data.category}</td>
            <td className='date'>{data.date.slice(0, 10)}</td>
            <td className={data.type === 'income' ? 'text-primary' : 'text-danger'}><span>{data.type === 'income' ? '+' : '-'}</span>{data.type === 'income' ? data.amount + '€' : ''}</td>
            <td className={data.type === 'expense' ? 'text-danger' : 'text-primary'}><span>{data.type === 'expense' ? '-' : '-'}</span>{data.type === 'expense' ? data.amount + '€' : ''}</td>
            <td className='buttons'>
                <button onClick={(e) => onDelete(e, data, subId)} className='btn border-0 me-1'><MdDelete /></button>
                <button onClick={(e) => onEdit(e, subId)} className='btn border-0 me-1'><AiFillEdit /></button>
                <button onClick={toggleToolsPopUp} className='btn bg-transparent text-dark'>...</button>
                {toolspopup &&
                    <div className='tools-content'>
                        <span className='cardicons text-center'><AiFillTags className={data.type === 'income' ? 'bg-primary text-yellow p-1 fs-4' : 'bg-danger text-yellow p-1 fs-4'} /></span>
                        <div>
                            <button onClick={(e) => onDelete(e, data, subId)} className='btn bg-transparent border-0'><MdDelete className='text-danger me-3' />
                                <span className='text-secondary'>Ištrinti</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={(e) => onEdit(e, subId)} className='btn bg-transparent border-0'><AiFillEdit className='text-primary me-3' />
                                <span className='text-secondary'>Koreguoti</span>
                            </button>
                        </div>
                    </div>
                }
            </td>
        </tr >
    )
}

export default Card