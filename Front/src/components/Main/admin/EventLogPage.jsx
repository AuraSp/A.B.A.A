import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
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
  }, [render]);
 

  function vardas(){
        if(localStorage.user !== undefined){
            let getVardas = localStorage.getItem("name")
            return getVardas.replace(/['"]+/g, '')
        }
    }

    function clearUser() {
      localStorage.clear();
      navigate('/');

  }
  useEffect(() => {
    getAllUsers().then((res) => {
      const userdata = res.data.data.transactions;//Fetch all existing data from database
      setuser(userdata);
      setUsername(userdata)
    });
  }, [render]);

  useEffect(() => {
    let temp = []
    temp.push(...all)
setdata(temp)
  }, [all, username])
  

  function filterLogs(){
    let tempLogs = [];
    let catFilter = false;
    let userFilter = false;
    if (catFilterState){
      catFilter = true;
    }
    if(userFilterState){
      userFilter = true;
    }
    logs.forEach((log)=>{
      if (catFilter && userFilter){
        if (log.text.includes(catFilterState) && log.userId === userFilterState){
          tempLogs.push(log);
        }
      }else if(catFilter && !userFilter){
        if(log.text.includes(catFilterState)){
          tempLogs.push(log);
        }
      }else if(!catFilter && userFilter){
        if(log.userId === userFilterState){
          tempLogs.push(log);
          
        }
      }
    });
    if(!catFilter && !userFilter){
      setAll(logs);
    }else{
      setAll(tempLogs);
    }
  }

  useEffect(() => {
    filterLogs();
  }, [catFilterState, userFilterState]);
  

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
        <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
          <Link to="/" className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></Link>

          <Link to="/analize" className='p-3 mt-5 text-decoration-none text-muted'>
              <span className='text-center text-primary p-1'><MdOutlineDashboardCustomize />
              </span>
              <span>Finansų analizė</span>
          </Link>
          <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
            <span>Veikla</span>
          </Link>
          <Link to="/admin" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
            <span>Admin</span>
          </Link>
        </div>
        <div className='maincontent p-0 m-0'>
          <div className='header'>
            {/* Visible on medium and small screens */}

            <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
              <Link to="/" className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</Link>
              <div className='links d-flex flex-row justify-content-center fs-5'>
                <Link to="/valdyba" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Valdyba</Link>
                <Link to="/budget" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span>Veikla</Link>
                <Link to="/admin" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Admin</Link>
                <div onClick={toggleAccountPopup} className='account d-flex flex-row justify-content-end p-3'>
                  <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdAccountCircle /></div>
                  <div className='fs-5 ps-1 pe-1 text-muted'>{vardas()}</div>
                  <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                  {accountpopup &&
                    <div className="acc-content shadow rounded">
                      <p className='text-muted'onClick={clearUser}>Atsijungti</p>
                    </div>
                  }
                </div>
              </div>
            </nav>

            {/* Visible on large screens */}
            <div onClick={toggleAccountPopup} className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
              <div className='fs-5 ps-1 pe-1'><MdAccountCircle /></div>
              <div className='fs-5 ps-1 pe-1'>{vardas()}</div>
              <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
              {accountpopup &&
                <div className="acc-content shadow rounded">
                  <p className='text-muted'onClick={clearUser}>Atsijungti</p>
                </div>
              }
            </div>
            <div className='ps-5 py-4'>
            <Link to="/admin" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Kategorijos</Link>
            <Link to="/eventLog" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Žurnalas</Link>
            </div>
          </div>
            <div>
    {!load &&<select
                  defaultValue='' 
                  onChange={(e) => setCatFilterState(e.target.value)}>
                    <option value={""}>Rodyti visus veiksmus</option>
                    <option value={"Pridėjo"}>Rodyti tik pridėjimus</option>
                    <option value={"Ištrynė"}>Rodyti tik pašalinimus</option>
                    <option value={"Atnaujino"}>Rodyti tik atnaujinimus</option>
                    <option value={"Atsiunte"}>Rodyti tik atsisiuntimus</option>
              </select>}
              {!load &&<select
                  defaultValue='' 
                  onChange={(e) => setUserFilterState(e.target.value)}>
                    <option value={""}>Rodyti visus vartotojus</option>
                    {user.map((data)=>{
                      return <option key={data._id} value={data._id}>{data.username}</option>
                    })}
              </select>}
            </div>
          <div className='main pt-3'>
            <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
              <div className='d-flex flex-row position-relative'>
                <>
                {!load &&
                    <EventLogTable
                      setAll={setAll}
                      all={all}
                      data={data}
                      setRender={setRender}
                      user = {user}
                    />}
                  </>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default EventLogPage