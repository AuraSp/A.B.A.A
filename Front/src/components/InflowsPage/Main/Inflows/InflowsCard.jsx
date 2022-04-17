import React from 'react'

function InflowsCard({ data }) {

    return (
        <tr className='border border-2'>
            <td></td>
            <td>{data.name}</td>
            <td>Category</td>
            <td>{data.date}</td>
            <td>{data.amount}</td>
            <td></td>
            <td>
                <button className='btn btn-danger border-0 text-warning mt-2'>Remove</button>
                <button className='btn btn-secondary border-0 text-warning mt-2'>Edit</button>
            </td>
        </tr >

    )
}

export default InflowsCard