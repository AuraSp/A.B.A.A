import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import ActivitiesChart from '../Charts/ActivitiesChart';
import YearsActivitiesChart from '../Charts/YearsActivitiesChart';
import { getAllUsers } from '../../../api/lib/TransactionsAPI';

function Analize() {
  //Pop up
  const [accountpopup, setAccountPopUp] = useState(false);
  //Data
  const [loading, setLoading] = useState(true);
  const [userId, setId] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [show, setShow] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [render] = useState(false);


  let navigate = useNavigate();


  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  let text = localStorage.getItem("user");
  let obj = JSON.parse(text)

  function clearUser() {
    localStorage.clear();
    navigate('/');

  }

  //---FetchData---//
  useEffect(() => {
    if (localStorage.user === undefined) {
      navigate('/');
    } else {
      getAllUsers().then((res) => {
        const userdata = res.data.data.transactions; //Fetch all existing data from database
        let userAllIds = userdata.filter((data) => data._id === obj); //Take All users Ids
        let roles = userAllIds.map((data) => data._id === obj ? (data.roles):(''));
        setAdmin(roles[0] === 'admin');
        setId(...userAllIds.map((data) => data._id)); //Take User Id
        setTimeout(() => setShow(true), 1);
        setLoading(false);
      });
    }

  }, [navigate, obj, userId, render]);

  console.log(admin);

  function vardas() {
    if (localStorage.user !== undefined) {
      let getVardas = localStorage.getItem("name")
      return getVardas.replace(/['"]+/g, '')
    }
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
              <Link to="/admin" admin={admin} className='p-3 text-decoration-none text-muted'>
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
              <h5 className='title m-0 d-block'>Finansų Analizė</h5>
            </div>
          </div>
          <div className='main pt-3'>
            <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
              <div className='d-flex flex-row position-relative'>
              <h5 className='w-100 p-0 ms-2 m-0'>Šio mėnesio balansas</h5>
              </div>
              {!loading &&
                <ActivitiesChart
                  userId={userId}
                  render={render}
                />
              }
            </div>
            <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow w-100'>
              <div className='d-flex flex-row position-relative'>
                <h5 className='w-100 p-0 ms-2 m-0'>Šių metų finansų analizė</h5>
              </div>
              {!loading &&
                <YearsActivitiesChart
                  userId={userId}
                  render={render}
                />
              }
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Analize

// import React, { useState, useEffect } from 'react';
// import { IoIosArrowDown } from "react-icons/io";
// import { MdAccountCircle, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings } from "react-icons/md";
// import { AiOutlineTransaction } from "react-icons/ai";
// import { GiWallet } from "react-icons/gi";
// import { Link, useNavigate } from "react-router-dom";
// import ActivitiesChart from '../Charts/ActivitiesChart';
// import YearsActivitiesChart from '../Charts/YearsActivitiesChart';
// import { getAllUsers } from '../../../api/lib/TransactionsAPI';

// function Analize() {
  // //Pop up
  // const [accountpopup, setAccountPopUp] = useState(false);
  // //Data
  // const [loading, setLoading] = useState(true);
  // const [userId, setId] = useState([]);
  // const [admin, setAdmin] = useState([]);
  // const [show, setShow] = useState(false);
  // const [incomes, setIncomes] = useState([]);
  // const [expenses, setExpenses] = useState([]);
  // const [render] = useState(false);
  // let navigate = useNavigate();

//   //User account menu popup
//   const toggleAccountPopup = () => {
//     setAccountPopUp(!accountpopup);
//   }

//   let text = localStorage.getItem("user");
//   let obj = JSON.parse(text)

//   function clearUser() {
//     localStorage.clear();
//     navigate('/');

// }
//   //---FetchData---//
  
//   useEffect(() => {
//     if (localStorage.user === undefined) {
//       navigate('/');
//     }else{
//       getAllUsers().then((res) => {
//         const userdata = res.data.data.transactions; //Fetch all existing data from database
//         let userAllIds = userdata.filter((data) => data._id === obj);
//         let roles = userAllIds.map((data) => data._id === obj ? (data.roles[0]):(''));
//         setAdmin(roles[0] === 'admin');
//         setTimeout(() => setShow(true), 1);
//       });
//     }
//   }, [render]);

//   console.log(admin);

//   function vardas(){
//     if(localStorage.user !== undefined){
//         let getVardas = localStorage.getItem("name")
//         return getVardas.replace(/['"]+/g, '')
//     }
// }

//   return (
//     <div className='container-fluid p-0 m-0'>
//       <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
//         <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
//           <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></p>
//         {show &&
//           <>
//             <Link to="/analize" className='p-3 mt-5 text-decoration-none text-muted'>
//               <span className='text-center text-primary p-1'><MdOutlineDashboardCustomize />
//               </span>
//               <span>Finansų analizė</span>
//             </Link>
//             <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
//               <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
//               <span>Veikla</span>
//             </Link>
//             {!admin ? (
//               <></>
//             ) : (
//               <Link to="/admin" admin={admin} className='p-3 text-decoration-none text-muted'>
//                   <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
//                   <span>Valdyba</span>
//               </Link>
//             )}   
//           </>
//         }       
//         </div>
//         <div className='maincontent p-0 m-0'>
//           <div className='header'>
//             {/* Visible on medium and small screens */}

//             <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
//               <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
//               <div className='links d-flex flex-row justify-content-center fs-5'>
//                 <Link to="/analize" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineDashboardCustomize /></span>Finansų analizė</Link>
//                 <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span>Veikla</Link>
//                 <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><MdOutlineAdminPanelSettings /></span>Valdyba</Link>
//                 <div className='account d-flex flex-row justify-content-end p-3'>
//                   <div className='d-flex user' onClick={toggleAccountPopup}>
//                     <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdAccountCircle /></div>
//                     <div className='fs-5 ps-1 pe-1 text-muted'>{vardas()}</div>
//                     <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
//                     {accountpopup &&
//                       <div className="acc-content shadow rounded">
//                         <button className='btn' onClick={clearUser}>Atsijungti</button>
//                       </div>
//                     }
//                   </div>
//                 </div>
//               </div>
//             </nav>

//             {/* Visible on large screens */}
//             <div className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
//               <div className='d-flex user' onClick={toggleAccountPopup}>
//                 <div className='fs-5 ps-1 pe-1 d-block'><MdAccountCircle /></div>
//                 <div className='fs-5 ps-1 pe-1'>{vardas()}</div>
//                 <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
//                 {accountpopup &&
//                   <div className="acc-content shadow rounded">
//                     <button className='btn' onClick={clearUser}>Atsijungti</button>
//                   </div>
//                 }
//               </div>
//             </div>
//             <div className='ps-5 py-4'>
//               <h5 className='title m-0 d-block'>Finansų Analizė</h5>
//             </div>
//           </div>
//           <div className='main pt-3'>
//             <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
//               <div className='d-flex flex-row position-relative'>
//               <h5 className='w-100 p-0 ms-2 m-0'>Šio mėnesio balansas</h5>
//               </div>
//               {!loading &&
//                 <ActivitiesChart
//                   userId={userId}
//                   render={render}
//                 />
//               }
//             </div>
//             <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow w-100'>
//               <div className='d-flex flex-row position-relative'>
//                 <h5 className='w-100 p-0 ms-2 m-0'>Šių metų finansų analizė</h5>
//               </div>
//               {!loading &&
//                 <YearsActivitiesChart
//                   userId={userId}
//                   render={render}
//                 />
//               }
//             </div>
//           </div>
//         </div>
//       </div >
//     </div>
//   )
// }

// export default Analize