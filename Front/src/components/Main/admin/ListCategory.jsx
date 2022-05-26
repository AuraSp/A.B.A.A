import React from 'react'

function ListCategory({value, defaultData, subId, onEdit, onDelete}) {
  return (
    <tr>
        <td>{value}</td>
        <td>
          <button onClick={(e) => onDelete(e, defaultData, subId)}>Istrinti</button>
          <button onClick={(e) => onEdit(e, subId)}>Redaguoti</button>
        </td>
    </tr>
  )
}

export default ListCategory