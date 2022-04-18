import React from 'react';
import { AiFillTags, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function InflowsCard({ data }) {

    return (
        <tr>
            <td className='fs-5'><AiFillTags /></td>
            <td>{data.descriptions}{data.name}</td>
            <td>{data.category}{data.categorys}</td>
            <td>{data.dates}{data.date}</td>
            <td>{data.inamount}</td>
            <td>{data.cost}</td>
            <td></td>
            <td>
                <button className='btn btn-danger border-0 text-warning me-1'><MdDelete /></button>
                <button className='btn btn-secondary border-0 text-warning ms-1'><AiFillEdit /></button>
            </td>
        </tr >

    )
}

export default InflowsCard