import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings, MdOutlineCategory } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsJournals } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { getAllCategories } from '../../../api/lib/CategoriesAPI';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryTable from './CategoryTable';
import { Link, useNavigate } from "react-router-dom";
import './Styles/admin.css';

function MainAdminTable() {
  const [accountpopup, setAccountPopUp] = useState(false);
  const [all, setAll] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(false);
  const [render, setRender] = useState(false);
  const [userId, setId] = useState([]);
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();
  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  //---FetchData---//
  useEffect(() => {

    getAllCategories().then((res) => {
      const categorydata = res.data.data.categories;
      setCategoryId(...categorydata.map((data) => data._id));
      setCategory(...categorydata.map((data) => data.category));
    });
  }, [render, categoryId]);

  useEffect(() => {
    let tempAll = [...category];
    setAll(tempAll);
  }, [category])


  function vardas() {
    if (localStorage.user !== undefined) {
      let getVardas = localStorage.getItem("name")
      return getVardas.replace(/['"]+/g, '')
    }
  }

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUser(localStorage.getItem("user").replace(/['"]+/g, ''))
    }
  }, []);

  function clearUser() {
    localStorage.clear();
    navigate('/');

  }

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
        <div className='sidenav text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
          <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></p>
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
            <span className='text-center text-primary p-1 text-decoration-none'><MdOutlineAdminPanelSettings /></span>
            <span>Valdyba</span>
          </Link>
        </div>
        <div className='mainadmincontent p-0 m-0'>
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
              <Link to="/admin" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineCategory /></span>Kategorijos</Link>
              <Link to="/eventLog" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><BsJournals /></span>Žurnalas</Link>
            </div>
          </div>
          <div className='main pt-3'>
            <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
              <div className='row d-flex flex-row'>
                <h5 className='w-25 p-0 m-0 me-5 pb-3'>Kategorijų sąrašas</h5>
                <div className='w-25 ms-5'>
                  <button
                    onClick={toggleAddPopup}
                    className='btn'>
                    <RiAddFill className='text-center me-3' />
                    <span>Pridėti kategoriją</span>
                  </button>
                </div>
              </div>
              {isOpen &&
                <CreateCategoryForm
                  handlepopupClose={toggleAddPopup}
                  setRender={setRender}
                  userId={user}
                  render={render}
                  setId={setId}
                />}
              <>
                <CategoryTable
                  categoryId={categoryId}
                  setAll={setAll}
                  all={all}
                  setRender={setRender}
                  render={render}
                  userId={user}
                />
              </>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default MainAdminTable