import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

function UserLog({ id, user, email, password, createdAt, roles, defaultData, onDelete, userId, subId, onEdit }) {
  let data = createdAt.substr(0, 10);

  return (
    <tr>
      <td>{userId}</td>
      <td>{user}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{data}</td>
      <td>{roles}</td>
      <td className='buttons w-55'>
        <button onClick={(e) => onDelete(e, defaultData, subId)} className='btn border-0 me-1 fs-5'><MdDelete /></button>
        <button onClick={(e) => onEdit(e, subId)} className='btn border-0 me-1 fs-5'><AiFillEdit /></button>
      </td>
    </tr>
  )
}

export default UserLog