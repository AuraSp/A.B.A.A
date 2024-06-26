import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { FaFileCsv } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import CreateForm from './CreateForm';
import SortCategory from './SortCategory';
import SortByDate from './SortByDate';
import * as generator from 'csv-generator-client'
import { getAllUsers } from '../../../api/lib/TransactionsAPI';
import ActivitiesChart from '../Charts/ActivitiesChart';
import Table from './Table';

import './Styles/maincontent.css';

function MainContainer() {
    //Pop up
    const [accountpopup, setAccountPopUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filterpopup, setFilterPopup] = useState(false);
    const [utilitiespopup, setUtilitiesPopUp] = useState(false);

    //Data
    const [admin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);
    const [editId, setEditId] = useState([]);
    const [userId, setId] = useState([]);
    const [render, setRender] = useState(false);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);
    //Filters
    const [category, setCategory] = useState();

    const [firstDate, setFirstDate] = useState();
    const [lastDate, setLastDate] = useState(today);

    let navigate = useNavigate();


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
        setEditId('')
        setCategory('');
        setFirstDate('');
        setLastDate('');
    }

    //User balance utilities popup
    const toggleUtilitiesPopUp = () => {
        setUtilitiesPopUp(!utilitiespopup)
    }

    const toggleClearFilter = () => {
        setCategory('');
        setFirstDate('');
        setLastDate('');
    }

    let text = localStorage.getItem("user");
    let obj = JSON.parse(text)



    function clearUser() {
        localStorage.clear();
        navigate('/');

    }

    let [users, setUsers] = useState([])
    //---FetchData---//
    useEffect(() => {
        if (localStorage.user === undefined) {
            navigate('/');
    }else{
        getAllUsers().then((res) => {
            // console.log(res.data.data.transactions);
            const userdata = res.data.data.transactions; //Fetch all existing data from database
            let userAllIds = userdata.filter((data) => data._id === obj); //Take All users Ids
            setEditId(...userAllIds.map((data) => data._id === obj)); //Take User Id for edit 
            setId(...userAllIds.map((data) => data._id)); //Take User Id
            let roles = userAllIds.map((data) => data._id === obj ? (data.roles):(''));
            setAdmin(roles[0] === 'admin');
            setTimeout(() => setShow(true), 1);
            setIncomes(...userAllIds.map((data) => data.income)); //Take all User's incomes
            setExpenses(...userAllIds.map((data) => data.expense)); //Take all User's expenses
            setLoading(false);
        });
    }

    }, [render, userId]);

    function vardas(){
        if(localStorage.user !== undefined){
            let getVardas = localStorage.getItem("name")
            return getVardas.replace(/['"]+/g, '')
        }

    }//, [navigate, obj, render, userId]);


    useEffect(() => {
        let tempAll = [...incomes, ...expenses]; //Put all taken incomes and expenses into new temporarily Object
        setAll(tempAll); //Give empty Object all temporarily data(everything inside it)
    }, [incomes, expenses])

    function vardas() {
        if (localStorage.user !== undefined) {
            let getVardas = localStorage.getItem("name")
            return getVardas.replace(/['"]+/g, '')
        }
    }


    //---ExpensesConverterIntoFormat-.csv---//
    const download = () => {
        generator = require('csv-generator-client');

        let settings = {
            separator: ',',
            addQuotes: true,
            autoDetectColumns: true
        };

        let allExpenses = [];
        for (let i = 0; i < expenses.length; i++) {
            console.log(expenses[i]);
            allExpenses.push(
                {
                    Aprašymas: expenses[i].description,
                    Kategorija: expenses[i].category, Suma: expenses[i].amount, Data: expenses[i].date.slice(0, 10)
                }
            );
        };
        generator.download({ settings: settings, fileName: 'Išlaidų_dokumentinė_kopija', dataArray: allExpenses });


        const postToLogs = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                text: 'Atsiunte',
                value: "Atsiunte",
            })
        };
        fetch('http://localhost:3000/api/v1/logs/addNewLog', postToLogs)
    }



    return (
        <div className='container-fluid p-0 m-0'>
            <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
                <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
                    <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></p>
                {show &&
                    <>
                    <Link to="/analize" className='p-3 mt-5 text-decoration-none text-muted'>
                        <span className='text-center text-primary p-1'><MdOutlineDashboardCustomize />
                        </span>
                        <span>Finansų analizė</span>
                    </Link>
                    <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
                        <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                        <span>Veikla</span>
                    </Link>
                    {!admin ? (
                        <></>
                    ) : (
                        <Link to="/admin" className='p-3 text-decoration-none text-muted'>
                            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                            <span>Valdyba</span>
                        </Link>
                    )}
                    </>
                }
                </div>
                <div className='maincontent p-0 m-0'>
                    <div className='header'>
                        {/* Visible on medium and small screens */}

                        <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
                            <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
                            <div className='links d-flex flex-row justify-content-center fs-5'>
                                <Link to="/analize" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Finansų analizė</Link>
                                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span>Veikla</Link>
                                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><MdOutlineAdminPanelSettings /></span>Valdyba</Link>
                                <div className='account d-flex flex-row justify-content-end p-3'>
                                    <div className='d-flex user' onClick={toggleAccountPopup}>
                                        <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdAccountCircle /></div>
                                        <div className='fs-5 ps-1 pe-1 text-muted'>{vardas()}</div>
                                        <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                                        {accountpopup &&
                                            <div className="acc-content shadow rounded">
                                                <button className='btn' onClick={clearUser}>Atsijungti</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Visible on large screens */}
                        <div className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
                            <div className='d-flex user' onClick={toggleAccountPopup}>
                                <div className='fs-5 ps-1 pe-1 d-block'><MdAccountCircle /></div>
                                <div className='fs-5 ps-1 pe-1'>{vardas()}</div>
                                <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                                {accountpopup &&
                                    <div className="acc-content shadow rounded">
                                        <button className='btn' onClick={clearUser}>Atsijungti</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='ps-5 py-4'>
                            <h5 className='title m-0 d-block'>Veikla</h5>
                        </div>
                    </div>
                    <div className='main pt-3'>
                        <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
                            <div className='d-flex flex-row position-relative'>
                                <h5 className='w-100 p-0 ms-2 m-0'>Šio mėnesio balansas</h5>
                                <button onClick={toggleUtilitiesPopUp} className='btn d-lg-none'><TiThMenu /></button>
                                {utilitiespopup &&
                                    <div className='utilities'>
                                        <div>
                                            <button
                                                onClick={toggleFilterPopup}
                                                className='btn bg-transparent border-0'>
                                                <IoFilterOutline className='text-center me-3' />
                                                <span >Filtruoti</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={toggleAddPopup}
                                                className='btn bg-transparent border-0'>
                                                <RiAddFill className='text-center me-3' />
                                                <span>Pridėti įrašą</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => download()}
                                                className='btn bg-transparent border-0'>
                                                <FaFileCsv className='text-center me-3' />
                                                <span>Eksportuoti</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                            {!loading &&
                                <ActivitiesChart
                                    userId={userId}
                                    render={render}
                                />
                            }
                            <div className='button col-lg-4 col-md-12 d-sm-none d-md-none d-lg-flex flex-row flex-wrap align-content-center justify-content-center p-md-3 mt-md-2'>
                                <div className="h-25 text-center">
                                    <button
                                        onClick={toggleFilterPopup}
                                        className='btn filter text-center p-1 me-2'>
                                        <span><IoFilterOutline className='text-center' /></span>
                                    </button>
                                    <span>Filtruoti</span>
                                </div>
                                <div className="h-25 text-center">
                                    <button
                                        onClick={toggleAddPopup}
                                        className='btn add text-center p-1 me-2'>
                                        <span><RiAddFill className='text-center' /></span>
                                    </button>
                                    <span>Pridėti įrašą</span>
                                </div>
                                <div className="h-25 text-center">
                                    <button
                                        onClick={() => download()}
                                        className='btn download text-center p-1 me-2'>
                                        <span><FaFileCsv className='text-center' /></span>
                                    </button>
                                    <span>Eksportuoti</span>
                                </div>
                            </div>
                        </div>
                        {filterpopup &&
                            <>
                                <div className='row activitiestable border-muted mx-auto my-4 pb-5 p-3 shadow d-flex flex-row'>
                                    <h5 className='w-100 p-0 m-0 ms-2 pb-4'>Filtruoti išlaidas</h5>
                                    <div className='row d-flex flex-row flex-nowrap align-items-center'>
                                        <div className='col-4 ms-2'>
                                            <SortCategory
                                                setCategory={setCategory}
                                            />
                                        </div>
                                        <div className='col-4 d-flex flex-row align-items-center justify-content-center'>
                                            <SortByDate
                                                setFirstDate={setFirstDate}
                                                setLastDate={setLastDate}
                                            />
                                        </div>
                                        <div className='col-4 d-flex flex-row justify-content-center'>
                                            <button className='btn border border-2 border-dark me-2 h-55' onClick={toggleClearFilter}>Išvalyti</button>
                                            <button className='btn border border-2 border-dark ms-4 h-55' onClick={toggleFilterPopup}>Išeiti</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div className='row activitiestable mx-auto mt-4 shadow text-muted d-flex flex-row'>
                            {!loading &&
                                <Table
                                    setAll={setAll}
                                    all={all}
                                    setEditId={setEditId}
                                    editId={editId}
                                    userId={userId}
                                    loading={loading}
                                    setRender={setRender}
                                    render={render}
                                    filterCategory={category}
                                    firstDate={firstDate}
                                    lastDate={lastDate}
                                />
                            }
                        </div>
                        {isOpen &&
                            <CreateForm
                                handlepopupClose={toggleAddPopup}
                                setId={setId}
                                userId={userId}
                                render={render}
                                setRender={setRender}
                            />}
                    </div>
                </div >
            </div >
        </div >
    )
}

export default MainContainer