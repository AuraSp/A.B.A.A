import React from 'react';
import Activities from './Activities/Activities';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

import './budgetmain.css';

function BudgetMain() {
    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu d-flex flex-column flex-wrap pt-4 shadow'>
                <a className='border border-danger p-4 mb-5' href='#'>LOGO</a>
                {/* <a className='rounded-circle border border-warning p-2 mt-4 mb-5' href='#'>ICON1</a> */}
                <a className='ps-4 mt-3 pt-2' href='#'><span className='text-center p-1 me-3'><MdOutlineDashboardCustomize /></span>Dashboard</a>
                <a className='ps-4 pt-3' href='#'><span className='text-center p-1 me-3'><GrTransaction /></span>Activities</a>
            </div>
            <div className='maincontent'>
                <div className='header row shadow-sm'>
                    <div className='d-flex flex-row justify-content-end py-4 border-bottom'>
                        <div className='fs-3 ps-1'><MdAccountCircle /></div>
                        <div className='fs-3 ps-1'>user</div>
                        <span className='fs-3 ps-2 pe-5'><IoIosArrowDown /></span>
                    </div>
                    <div className='ps-5 py-4'>
                        <h4 className='title m-0 ps-5'>Activities</h4>
                    </div>
                </div>
                <Activities />
            </div>
        </div >
    )
}

export default BudgetMain