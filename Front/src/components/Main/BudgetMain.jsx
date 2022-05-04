import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import MainTable from './Veikla/MainTable';
import CreateUserDataForm from './Veikla/CreateUserDataForm';
import SortTable from './Veikla/SortTable';
import { ExportToCsv } from 'export-to-csv';

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

    //---ExpensesConverterIntoFormat-.csv---//
    const exportOptions = {
        fieldSeparator: ',',
        quoteStrings: '',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'IŠLAIDŲ KOPIJA',
        filename: 'Išlaidų dokumentinė kopija',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
    };
    const download = (alldata) => {
        const expenses = alldata.filter(item => item.type === 'expense');
        const csvExporter = new ExportToCsv(exportOptions);

        let data = [];
        for (let i = 0; i < expenses.length; i++) {
            console.log(expenses[i]);
            data.push(
                {
                    'Tipas': expenses[i].type,
                    'Aprašymas': expenses[i].description,
                    'Kategorija': expenses[i].category
                },
            )
        }
        csvExporter.generateCsv(data);
    }

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

                    <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
                        <Link to="/" className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</Link>
                        <div className='links d-flex flex-row justify-content-center fs-5'>
                            <Link to="/dashboard" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Dashboard</Link>
                            <Link to="/budget" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span>Veikla</Link>
                            <div onClick={toggleAccountPopup} className='account d-flex flex-row justify-content-end p-3'>
                                <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdAccountCircle /></div>
                                <div className='fs-5 ps-1 pe-1 text-muted'>User</div>
                                <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                                {accountpopup &&
                                    <div className="acc-content shadow rounded">
                                        <p className='text-muted'>Atsijungti</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </nav>

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
                    <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow text-muted d-flex flex-row'>
                        <FullBudget
                            data={alldata}
                        />
                        <div className='col-lg-4 col-md-12 col-sm-12 button ps-5 pt-4 text-center'>
                            <button
                                onClick={toggleFilterPopup}
                                className='text-center me-2 pe-2 ps-2 pb-1 pt-1 border border-secondary'><IoFilterOutline className='fs-4 bg-none' /></button>
                            <button
                                onClick={toggleAddPopup}
                                className='add text-light ps-3 pe-3 pt-2 pb-2'>+ Pridėti transakcijas</button>
                            <button onClick={() => download(alldata)}
                            >CSV</button>
                        </div>
                    </div>
                    <>
                        {filterpopup &&
                            <SortTable
                                handlefilterpopupClose={toggleFilterPopup
                                }
                            />
                        }
                    </>
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