import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import MainTable from './Activities/MainTable';
import CreateUserDataForm from './Activities/CreateUserDataForm';
import SortTable from './Activities/SortTable';

import './budgetmain.css';

function BudgetMain() {
    const [accountpopup, setAccountPopUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filterpopup, setFilterPopup] = useState(false);
    const [alldata, setAllData] = useState([]);

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
            <div className='sidemenu text-warning d-flex flex-column flex-wrap pt-1'>
                <Link to="/" className='ps-4 mt-3 pt-2 text-decoration-none text-mute'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</Link>
                <div className='p-1 mt-5'></div>
                {/* <Link to="/dashboard" className='ps-4 p-3 mt-5 fs-5 text-decoration-none text-muted' href='#'><span className='text-center text-primary p-1 me-3'><MdOutlineDashboardCustomize /></span>Dashboard</Link> */}
                <Link to="/budget" className='p-3 text-decoration-none text-muted' href='#'><span className='text-center text-primary p-1 me-3 text-decoration-none'><AiOutlineTransaction /></span>Veikla</Link>
            </div>
            <div className='maincontent'>
                <div className='header'>
                    <div onClick={toggleAccountPopup} className='account d-flex flex-row justify-content-end py-4 border-bottom'>
                        {/* <div className='fs-3 ps-1 pe-1'><MdAccountCircle /></div> */}
                        {/* <div className='fs-3 ps-1 pe-1'>user</div> */}
                        {/* <span className='fs-3 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span> */}
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
                    <div className='ps-3 text-muted d-flex flex-row'>
                        <p className='w-50'>Čia galite atlikti tam tikras sąskaitos operacijas. Sandoriai apima mokėjimus, darbo užmokesčių suvestines ir t.t. Kiekviena operacija yra gaunama (įplauka) arba siunčiama (ištaka) ir turi turėti aprašymą, biudžeto kategoriją, kurią norite priskirti, datą ir sumą.</p>
                        <div className='button ps-5 pt-4 w-50 text-center'>
                            {/* <button
                                onClick={toggleFilterPopup}
                                className='text-center me-2 pe-2 ps-2 pb-2 pt-2 border border-secondary'><IoFilterOutline className='fs-4 bg-none' /></button> */}
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
                    <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow'>
                        <MainTable
                            setAllData={setAllData}
                        />
                    </div>
                    {isOpen &&
                        <CreateUserDataForm
                            handlepopupClose={toggleAddPopup}
                            data={alldata}
                        />}
                </div>
            </div>
        </div >
    )
}

export default BudgetMain