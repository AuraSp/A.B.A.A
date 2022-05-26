import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

function ListCategory({ value, defaultData, subId, onEdit, onDelete }) {
  return (
    <tr className='fw-bold admintablelist'>
      <td>{value}</td>
      <td className='buttons w-55'>
        <button onClick={(e) => onDelete(e, defaultData, subId)} className='btn border-0 me-1 fs-5'><MdDelete /></button>
        <button onClick={(e) => onEdit(e, subId)} className='btn border-0 me-1 fs-5'><AiFillEdit /></button>
      </td>
    </tr >
  )
}

export default ListCategory