import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAccountCircle, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings, MdOutlineCategory } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsJournals } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { getAllLogs } from '../../../api/lib/LogsAPI';
import { Link, useNavigate } from "react-router-dom";
import EventLogTable from './EventLogTable'
import { getAllUsers } from '../../../api/lib/TransactionsAPI';

function EventLogPage() {
  const [accountpopup, setAccountPopUp] = useState(false);
  const [all, setAll] = useState([]);
  const [logs, setLogs] = useState([]);
  const [render, setRender] = useState(false);
  const [load, setLoad] = useState(true)
  const [user, setuser] = useState([]);
  const [username, setUsername] = useState([]);
  const [data, setdata] = useState([]);
  const [catFilterState, setCatFilterState] = useState("");
  const [userFilterState, setUserFilterState] = useState("");

  let navigate = useNavigate();
  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  //---FetchData---//
  useEffect(() => {
    getAllLogs().then((res) => {
      const logdata = res.data.data.logs;
      setAll(logdata);
      setLogs(logdata);
      setLoad(false);
    });
    getAllUsers().then((res) => {
      const userdata = res.data.data.transactions;//Fetch all existing data from database
      setuser(userdata);
      setUsername(userdata)
    });
  }, [render]);


  function vardas() {
    if (localStorage.user !== undefined) {
      let getVardas = localStorage.getItem("name")
      return getVardas.replace(/['"]+/g, '')
    }
  }

  function clearUser() {
    localStorage.clear();
    navigate('/');

  }

  useEffect(() => {
    let temp = []
    temp.push(...all)
    setdata(temp)
  }, [all, username])


  function filterLogs() {
    let tempLogs = [];
    let catFilter = false;
    let userFilter = false;
    if (catFilterState) {
      catFilter = true;
    }
    if (userFilterState) {
      userFilter = true;
    }
    logs.forEach((log) => {
      if (catFilter && userFilter) {
        if (log.text.includes(catFilterState) && log.userId === userFilterState) {
          tempLogs.push(log);
        }
      } else if (catFilter && !userFilter) {
        if (log.text.includes(catFilterState)) {
          tempLogs.push(log);
        }
      } else if (!catFilter && userFilter) {
        if (log.userId === userFilterState) {
          tempLogs.push(log);

        }
      }
    });
    if (!catFilter && !userFilter) {
      setAll(logs);
    } else {
      setAll(tempLogs);
    }
  }

  useEffect(() => {
    filterLogs();
  }, [catFilterState, userFilterState]);

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
        <div className='sidenav text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
          <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span>BudgetSimple</span></p>
          <Link to="/analize" className='p-3 mt-5 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1'><MdOutlineDashboardCustomize />
            </span>
            <span className='text-light'>Finansų analizė</span>
          </Link>
          <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
            <span className='text-light'>Veikla</span>
          </Link>
          <Link to="/admin" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><MdOutlineAdminPanelSettings /></span>
            <span className='text-light'>Valdyba</span>
          </Link>
        </div>
        <div className='mainadmincontent p-0 m-0'>
          <div className='header'>
            {/* Visible on medium and small screens */}

            <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
              <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
              <div className='links d-flex flex-row justify-content-center fs-5'>
                <Link to="/analize" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span><span className='text-light'>Finansų analizė</span></Link>
                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span><span className='text-light'>Veikla</span></Link>
                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><MdOutlineAdminPanelSettings /></span><span className='text-light'>Valdyba</span></Link>
                <div className='account d-flex flex-row justify-content-end p-3'>
                  <div className='d-flex user' onClick={toggleAccountPopup}>
                    <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdOutlineAccountCircle className='text-light' /></div>
                    <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                    <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
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
                <div className='fs-5 ps-1 pe-1 d-block'><MdOutlineAccountCircle className='text-light' /></div>
                <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                {accountpopup &&
                  <div className="acc-content shadow rounded">
                    <button className='btn' onClick={clearUser}>Atsijungti</button>
                  </div>
                }
              </div>
            </div>
            <div className='nav ps-5'>
              <Link to="/admin" className='p-2 text-decoration-none text-light'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineCategory /></span>Kategorijos</Link>
              <Link to="/eventLog" className='p-2 text-decoration-none text-light'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><BsJournals /></span>Žurnalas</Link>
              <Link to="/users" className='p-2 text-decoration-none text-light'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><RiUserSettingsLine className='text-warning'/></span>Vartotojai</Link>
            </div>
          </div>
          <div>
            <div className='mainadmin pt-5 text-light'>
              <div className='row activitiestable mx-auto p-3 w-100'>
                <div className='row d-flex flex-row pb-3'>
                  <h5 className='w-25 p-0 m-0 pb-3 pt-1'>Veiksmų žurnalas</h5>
                </div>
                {!load &&
                  <EventLogTable
                    setAll={setAll}
                    all={all}
                    data={data}
                    setRender={setRender}
                    load={load}
                    setCatFilter={setCatFilterState}
                    setUserFilterState={setUserFilterState}
                    user={user}
                  />}
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default EventLogPage