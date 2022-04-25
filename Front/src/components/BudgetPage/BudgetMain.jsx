import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import MainTable from './Activities/MainTable';
import CreateUserDataForm from './Activities/CreateUserDataForm';

import './budgetmain.css';

function BudgetMain() {
    const [accountpopup, setAccountPopUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [alldata, setAllData] = useState([]);

    const toggleAccPopup = () => {
        setAccountPopUp(!accountpopup);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        alldata.map((data) => data)
    }, [alldata])

    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu text-warning d-flex flex-column flex-wrap pt-1'>
                <Link to="/" className='ps-4 mt-3 pt-2 text-decoration-none text-muted fs-5'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>LOGONAME</Link>
                <Link to="/dashboard" className='ps-4 p-3 mt-5 fs-5 text-decoration-none text-muted' href='#'><span className='text-center text-primary p-1 me-3'><MdOutlineDashboardCustomize /></span>Dashboard</Link>
                <Link to="/budget" className='ps-4 p-3 fs-5 text-decoration-none text-muted' href='#'><span className='text-center text-primary p-1 me-3 text-decoration-none'><AiOutlineTransaction /></span>Activities</Link>
            </div>
            <div className='maincontent'>
                <div className='header'>
                    <div onClick={toggleAccPopup} className='account d-flex flex-row justify-content-end py-4 border-bottom'>
                        <div className='fs-3 ps-1 pe-1'><MdAccountCircle /></div>
                        <div className='fs-3 ps-1 pe-1'>user</div>
                        <span className='fs-3 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                        {accountpopup &&
                            <div class="acc-content shadow rounded">
                                <p className='text-muted'>Sign out</p>
                            </div>
                        }
                    </div>
                    <div className='ps-5 py-4'>
                        <h4 className='title m-0 d-block'>Activities</h4>
                    </div>
                </div>
                <div className='main pt-3'>
                    <div className='ps-3 text-muted d-flex flex-row'>
                        <p className='w-50'>Here you can add transactions into your account. Transactions include payments, paychecks etc. Every transaction is either incoming (inflow) or outgoing (outflow) and must have description, the category of the budget you would like to assign it to, date and amount</p>
                        <div className='button ps-5 pt-4 w-50 text-center'>
                            <button
                                onClick={togglePopup}
                                className='text-light ps-3 pe-3 pt-2 pb-2'>+ Add Transaction</button>
                        </div>
                    </div>
                    <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow'>
                        <MainTable
                            setAllData={setAllData}
                        />
                    </div>
                    {isOpen &&
                        <CreateUserDataForm
                            handlepopupClose={togglePopup}
                            data={alldata}
                        />}
                </div>
            </div>
        </div >
    )
}

export default BudgetMain