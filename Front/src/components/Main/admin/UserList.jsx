import React from 'react'

function UserLog({id, user, email, password, createdAt, roles, defaultData, onDelete, subId}) {
    let data = createdAt.substr(0, 10);
  return (
    <tr>
        <td>{subId}</td>
        <td>{user}</td>
        <td>{email}</td>
        <td>{password}</td>
        <td>{data}</td>
        <td>{roles}</td>
        <td><button onClick={(e) => onDelete(e, defaultData, subId)}>Ištrinti</button><button>redaguoti</button></td>
    </tr>
  )
}

export default UserLog