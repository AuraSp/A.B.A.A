import React from 'react'

function ListLog({userId, text, createdAt}) {
  return (
    <tr>
        <td>{userId}</td>
        <td>{text}</td>
        <td>{createdAt}</td>
    </tr>
  )
}

export default ListLog