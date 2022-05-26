import React from 'react'

function ListLog({ createdAt, user, datas }) {

  return (
    <tr key={datas._id}>
      <td>{datas.userId}</td>
      <>{user.map((users) => (users._id === datas.userId ? (<td>{users.username}</td>) : ('')))}</>
      <>{user.map((users) => (users._id === datas.userId ? (<td>{users.email}</td>) : ('')))}</>
      <>{user.map((users) => (users._id === datas.userId ? (<td>{users.roles}</td>) : ('')))}</>
      <td>{datas.text}</td>
      <td>{datas.amount}</td>
      <td>{createdAt}</td>
    </tr>
  )
}

export default ListLog