import React from 'react'

function ListCategory({value, text, defaultData, subId, onEdit, onDelete}) {
  return (
    <tr>
        <td>{value}</td>
        <td>{text}</td>
        <td><button onClick={(e) => onEdit(e, subId)}>edit</button>
        <button onClick={(e) => onDelete(e, defaultData, subId)}>delete</button></td>
    </tr>
  )
}

export default ListCategory