import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaFileCsv } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
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
    const [category, setCategory] = useState();


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

    const callbackFunction = (category) => {
        setCategory(category)
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

    // function search(rows){
    //     return rows.filter(row => row.categor.toLowerCase().indexOf(categor) > -1)
    // }

    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap pt-1'>
                <Link to="/" className='ps-4 mt-3 pt-2 pb-1 text-decoration-none '><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></Link>
                <Link to="/dashboard" className='p-3 mt-5 text-decoration-none text-muted'><span className='text-center text-primary p-1'><MdOutlineDashboardCustomize /></span><span className='border-0'>Dashboard</span></Link>
                <Link to="/budget" className='p-3 text-decoration-none text-muted'><span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span><span className='border-0'>Veikla</span></Link>
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
                    <div className='row activitiestable mx-auto my-4 shadow text-muted d-flex flex-row'>
                        <FullBudget
                            data={alldata}
                        />
                        {/* <div className='button col-lg-4 col-md-6 col-sm-12 d-flex flex-row flex-wrap align-content-center justify-content-center'> */}
                        <div className='button col-lg-4 col-md-12 col-sm-12 d-flex flex-row flex-wrap align-content-center justify-content-center'>
                            <div className="h-25 ms-1 text-center d-inline">
                                <button
                                    onClick={toggleFilterPopup}
                                    className='btn me-3 text-center p-0'>
                                    <IoFilterOutline className='text-center' />
                                </button>
                                <span>Filtruoti įrašą</span>
                            </div>
                            <div className="h-25 text-center d-inline">
                                <button
                                    onClick={toggleAddPopup}
                                    className='btn me-3 text-center p-0'>
                                    <RiAddFill className='text-center' />
                                </button>
                                <span>Pridėti įrašą</span>
                            </div>
                            <div className="h-25 text-center d-inline">
                                <button
                                    onClick={() => download(alldata)}
                                    className='btn me-3 text-center p-0'>
                                    <FaFileCsv className='text-center' />
                                </button>
                                <span>Eksportuoti</span>
                            </div>
                        </div>
                    </div>
                    <>
                        {filterpopup &&
                            <SortTable
                                handlefilterpopupClose={toggleFilterPopup}
                                parentCallback={callbackFunction}
                            />
                        }
                    </>
                    <div className='activitiestable border border-1 border-muted mx-auto p-5 shadow w-100'>
                        <MainTable
                            setAllData={setAllData}
                            render={render}
                            setRender={setRender}
                            filterCategory={category}
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