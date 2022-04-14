import React from 'react'

function IncomesCard({ data }) {

    return (
        <tr className='border border-2'>
            <td>{data.name}</td>
            <td>{data.amount}</td>
            <td>{data.date}</td>
            <td>
                <button className='btn btn-danger border-0 text-warning mt-2'>Remove</button>
                <button className='btn btn-secondary border-0 text-warning mt-2'>Edit</button>
            </td>
        </tr >

    )
}

export default IncomesCard