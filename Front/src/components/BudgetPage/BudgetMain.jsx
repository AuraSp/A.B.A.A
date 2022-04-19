import React from 'react';
import Activities from './Activities/Activities';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

import './budgetmain.css';

function BudgetMain() {
    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu d-flex flex-column flex-wrap pt-4 shadow'>
                <a className='border border-danger p-4 mb-5' href='#'>LOGO</a>
                {/* <a className='rounded-circle border border-warning p-2 mt-4 mb-5' href='#'>ICON1</a> */}
                <a className='border border-primary p-4 mt-5' href='#'>ICON2</a>
                <a className='border border-secondary p-4 mt-5' href='#'>ICON3</a>
            </div>
            <div className='maincontent'>
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
                <Activities />
            </div>
        </div >
    )
}

export default BudgetMain