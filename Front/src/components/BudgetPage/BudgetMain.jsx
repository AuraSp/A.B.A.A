import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize, MdAccountBalance } from "react-icons/md";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import MainTable from './Activities/MainTable';
import CreateUserDataForm from './Activities/CreateUserDataForm';
import SortTable from './Activities/SortTable';

import './budgetmain.css';
import FullBudget from './Charts/FullBudget';

function BudgetMain() {
    const [accountpopup, setAccountPopUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filterpopup, setFilterPopup] = useState(false);
    const [alldata, setAllData] = useState([]);
    const [render, setRender] = useState(false);

    //User account menu popup
    const toggleAccountPopup = () => {
        setAccountPopUp(!accountpopup);
    }
    //User add transactions popup
    const toggleAddPopup = () => {
        setIsOpen(!isOpen);
    }
    //User filter transactions popup
    const toggleFilterPopup = () => {
        setFilterPopup(!filterpopup);
    }

    useEffect(() => {
        alldata.map((data) => data)
    }, [alldata])

    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap pt-1'>
                <Link to="/" className='ps-4 mt-3 pt-2 pb-1 text-decoration-none text-mute'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</Link>
                <Link to="/dashboard" className='p-3 mt-5 text-decoration-none text-muted'><span className='text-center text-primary p-1 me-3'><MdOutlineDashboardCustomize /></span>Dashboard</Link>
                <Link to="/budget" className='p-3 text-decoration-none text-muted'><span className='text-center text-primary p-1 me-3 text-decoration-none'><AiOutlineTransaction /></span>Veikla</Link>
            </div>
            <div className='maincontent'>
                <div className='header'>
                    {/* Visible on medium and small screens */}
                    <div onClick={toggleAccountPopup} className='account d-lg-none d-md-flex d-sm-flex flex-row justify-content-end py-4 border-bottom'>
                        <div className='fs-5 ps-1 pe-1'><MdAccountCircle /></div>
                        <div className='fs-5 ps-1 pe-1'>user</div>
                        <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                        {accountpopup &&
                            <div className="acc-content shadow rounded">
                                <p className='text-muted'>Atsijungti</p>
                            </div>
                        }
                    </div>
                    {/* Visible on large screens */}
                    <div onClick={toggleAccountPopup} className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
                        <div className='fs-5 ps-1 pe-1'><MdAccountCircle /></div>
                        <div className='fs-5 ps-1 pe-1'>user</div>
                        <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                        {accountpopup &&
                            <div className="acc-content shadow rounded">
                                <p className='text-muted'>Atsijungti</p>
                            </div>
                        }
                    </div>
                    <div className='ps-5 py-4'>
                        <h5 className='title m-0 d-block'>Veikla</h5>
                    </div>
                </div>
                <div className='main pt-3'>
                    <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow text-muted bg-dark d-flex flex-row'>
                        <div className='col-lg-4 col-md-6 col-sm-12 d-flex flex-row flex-wrap fs-5'>
                            <FullBudget />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12 balancesummary d-flex flex-row flex-wrap fs-5'>
                            <div><span><BsArrowUpShort className='bg-danger text-center p-1' /><span>€345</span></span></div>
                            <div><span><BsArrowDownShort className='bg-primary text-center p-1' />€345</span></div>
                            <div><span><HiOutlineDatabase className='bg-warning text-center p-1' />Likutis</span></div>
                        </div>
                        <div className='col-lg-4 col-md-12 col-sm-12 button ps-5 pt-4 text-center'>
                            <button
                                onClick={toggleFilterPopup}
                                className='text-center me-2 pe-2 ps-2 pb-1 pt-1 border border-secondary'><IoFilterOutline className='fs-4 bg-none' /></button>
                            <button
                                onClick={toggleAddPopup}
                                className='add text-light ps-3 pe-3 pt-2 pb-2'>+ Pridėti transakcijas</button>
                        </div>
                    </div>
                    <div>
                        {filterpopup &&
                            <SortTable
                                handlefilterpopupClose={toggleFilterPopup
                                }
                            />
                        }</div>
                    <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow w-100'>
                        <MainTable
                            setAllData={setAllData}
                            render={render}
                            setRender={setRender}
                        />
                    </div>
                    {isOpen &&
                        <CreateUserDataForm
                            handlepopupClose={toggleAddPopup}
                            data={alldata}
                            render={render}
                            setRender={setRender}
                        />}
                </div>
            </div>
        </div >
    )
}

export default BudgetMain