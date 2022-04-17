import React from 'react';
import './header.css';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

function Header() {
    return (
        <div className='header row shadow-sm'>
            <div className='d-flex flex-row justify-content-end py-4 border-bottom border-2 border-secondary'>
                <div className='fs-3 ps-1'><MdAccountCircle /></div>
                <div className='fs-3 ps-1'>user</div>
                <span className='fs-3 ps-2 pe-5'><IoIosArrowDown /></span>
            </div>
            <div className='ps-5 py-4'>
                <h4 className='title m-0'>Activities</h4>
            </div>
        </div>
    )
}

export default Header