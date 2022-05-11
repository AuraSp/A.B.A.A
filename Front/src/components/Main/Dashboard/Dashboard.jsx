import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { Link } from "react-router-dom";
import ActivitiesChart from '../Charts/ActivitiesChart';
import { getAllUsers } from '../../../api/lib/TransactionsAPI';

function Dashboard() {
  const [accountpopup, setAccountPopUp] = useState(false);

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [render, setRender] = useState(false);

  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  //---FetchData---//
  useEffect(() => {
    getAllUsers().then((res) => {
      const userdata = res.data.data.transactions; //Fetch all existing data from database
      setIncomes(...userdata.map((data) => data.income)); //Take all User's incomes
      setExpenses(...userdata.map((data) => data.expense)); //Take all User's expenses
    });
  }, [render]);

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap'>
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
              <h5 className='title m-0 d-block'>Dashboard</h5>
            </div>
          </div>
          <div className='main pt-3'>
            <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
              <div className='d-flex flex-row position-relative'>
                <h5 className='w-100 p-0 m-0'>Balansas</h5>
              </div>
              <ActivitiesChart
                expenses={expenses}
                incomes={incomes}
              />
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Dashboard