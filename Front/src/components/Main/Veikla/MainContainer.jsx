import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { FaFileCsv } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import CreateForm from './CreateForm';
import SortCategory from './SortCategory';
import SortByDate from './SortByDate';
import { ExportToCsv } from 'export-to-csv';
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
    const [loading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [all, setAll] = useState([]);
    const [editId, setEditId] = useState([]);
    const [userId, setId] = useState([]);
    const [render, setRender] = useState(false);

    //Filters
    const [category, setCategory] = useState();
    const [firstDate, setFirstDate] = useState('');
    const [lastDate, setLastDate] = useState('');

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

    //User balance utilities popup
    const toggleUtilitiesPopUp = () => {
        setUtilitiesPopUp(!utilitiespopup)
    }

    const callbackFunction = (category) => {
        setCategory(category)
    }

    //---FetchData---//
    useEffect(() => {
        getAllUsers().then((res) => {
            const userdata = res.data.data.transactions; //Fetch all existing data from database
            setEditId(...userdata.map((data) => data._id)); //Take User Id
            setId(...userdata.map((data) => data._id));
            setIncomes(...userdata.map((data) => data.income)); //Take all User's incomes
            setExpenses(...userdata.map((data) => data.expense)); //Take all User's expenses
            setLoading(false);
        });
    }, [render]);

    useEffect(() => {
        let tempAll = [...incomes, ...expenses]; //Put all taken incomes and expenses into new temporarily Object
        setAll(tempAll); //Give empty Object all temporarily data(everything inside it)
    }, [incomes, expenses])

    const searchDate = () => {
        for (let i = 0; i < expenses.length; i++) {
            let date = expenses.map((data) => data.date)

            if (date === firstDate) {
                expenses.map((data) => data.date === firstDate)
                console.log(date)
            }
        }
        var updateList = [...all];
        updateList = updateList.filter((item) => {
            return item.date === firstDate
        })
        return setAll(updateList)
    }
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
        useKeysAsHeaders: true,
    };
    const download = () => {

        const csvExporter = new ExportToCsv(exportOptions);
        let data = [];
        for (let i = 0; i < expenses.length; i++) {
            console.log(expenses[i]);
            data.push(
                {
                    'Aprašymas': expenses[i].description,
                    'Kategorija': expenses[i].category,
                    'Suma': expenses[i].amount,
                    'Data': expenses[i].date
                },
            )
        }
        csvExporter.generateCsv(data);
    }


    return (
        <div className='container-fluid p-0 m-0'>
            <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
                <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
                    <Link to="/" className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></Link>

                    <Link to="/dashboard" className='p-3 mt-5 text-decoration-none text-muted'>
                        <span className='text-center text-primary p-1'><MdOutlineDashboardCustomize />
                        </span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
                        <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                        <span>Veikla</span>
                    </Link>
                </div>
                <div className='maincontent p-0 m-0'>
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
                        <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
                            <div className='d-flex flex-row position-relative'>
                                <h5 className='w-100 p-0 m-0'>Balansas</h5>
                                <button onClick={toggleUtilitiesPopUp} className='btn d-lg-none'><TiThMenu /></button>
                                {utilitiespopup &&
                                    <div className='utilities'>
                                        <div>
                                            <button
                                                onClick={toggleFilterPopup}
                                                className='btn bg-transparent border-0'>
                                                <IoFilterOutline className='text-center me-3' />
                                                <span>Filtruoti</span>
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
                            <ActivitiesChart
                                expenses={expenses}
                                incomes={incomes}
                            // setSeries={setSeries}
                            //  series={series}
                            />
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
                            <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow text-muted d-flex flex-row'>
                                <SortCategory
                                    handlefilterpopupClose={toggleFilterPopup}
                                    parentCallback={callbackFunction}
                                />
                                <SortByDate
                                    searchDate={searchDate}
                                    setFirstDate={setFirstDate}
                                    setLastDate={setLastDate}
                                />
                            </div>
                        }
                        <div className='row activitiestable mx-auto my-4 shadow text-muted d-flex flex-row'>
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
                            // setSeries={setSeries}
                            // series={series}

                            />
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