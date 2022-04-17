import React from 'react';
import './outflows.css'

function Outflows() {
    return (
        <table className='table m-auto'>
            <thead className='thead text-center'>
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Outflows</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className='text-center'>
                <tr>
                    <th>icon</th>
                    <th>df</th>
                    <th>df</th>
                    <th>df</th>
                    <th>df</th>
                    <th>
                        <button>Edit</button>
                        <button>Remove</button>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default Outflows