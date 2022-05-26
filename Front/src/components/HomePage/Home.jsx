import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GiWallet } from "react-icons/gi";

import './Home.css'

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.user !== undefined) {
      navigate('/veikla');
    }
  })

  return (
    <>
      <div className='container-fluid home-page'>
        <div className="row d-flex justify-content-between">
          <div className="col-4">
            <Link to="/" className='text-warning mt-3 pt-2 pb-1 text-decoration-none fs-3'>
              <span className='text-center p-1 me-3 ms-2 fs-1'><GiWallet /></span>
              <span className='text-secondary'>BudgetSimple</span>
            </Link>
          </div>


          <div className="col-5 d-flex justify-content-end my-2 me-3">
            <Link to="/login" className='m-2 mt-2 btn btn-warning'>Prisijungimas</Link>
            <Link to="/signup" className='m-2 mt-2 btn btn-primary'>Registracija</Link>
          </div>
        </div>
        <div className="sidemenu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">

              </div>
              <div className="col-8">
                <div className="container-fluid">
                  <div className="row m-4 pt-4">
                    <h2>Text</h2>
                    <p className='text-dark'>
                      Biudžetas yra viena iš svarbiausių jūsų finansinio planavimo priemonių. Neturėdami biudžeto galite rizikuoti per daug išleisti. Gali būti sunkiau pasiekti svarbius finansinius tikslus, pvz., sutaupyti skubios pagalbos fondui ar įsigyti būstą, kai neturite biudžeto, pagal kurį galėtumėte nukreipti išlaidas.
                    </p>
                    <p className='text-dark'>
                      Biudžeto sudarymo meno įvaldymas prasideda nuo svarbiausių gero biudžeto komponentų supratimo. Kurdami namų ūkio biudžetą nepamirškite įtraukti šių devynių funkcijų.
                    </p>
                    <div className='col-5'>
                      <h3>Tikslios išlaidų kategorijos</h3>
                      <p className='text-dark'>
                        Nors biudžeto darbalapiai gali būti naudingas išteklius nustatant biudžetą, jie gali visiškai neatitikti jūsų išlaidų įpročių. Kurdami biudžetą sutelkite dėmesį į išlaidų kategorijas, kurios atspindi, kur eina jūsų pinigai. Išlaidų stebėjimas naudojant biudžeto sudarymo programą yra geras būdas suprasti savo mėnesio išlaidas.
                      </p>
                      <h3>Pakanka išlaidų kategorijų</h3>
                      <p className='text-dark'>
                        Jūsų biudžete turi būti ne tik tikslios išlaidų kategorijos, bet ir tinkamas išlaidų kategorijų skaičius. Nors nenorite persistengti, suskirstę platesnes išlaidų kategorijas į mažesnius segmentus galite susidaryti aiškesnį vaizdą, kur keliauja jūsų pinigai. Tai naudinga norint suprasti savo išlaidų modelius ir taip pat gali padėti tiksliai nustatyti sritis, kuriose galite sumažinti išlaidas. Tiesiog stenkitės, kad nepaskęstumėte detalėse.
                      </p>
                    </div>
                    <img src="https://www.zambianguardian.com/wp-content/uploads/2021/12/budget-696x365.jpg" className='col-5 w-50 h-50 m-2 rounded' alt="Budget" />
                    <p className='text-dark'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta fugiat nemo pariatur dolores, sed id autem iusto tempora. Fuga sed voluptates molestias! Iure sequi eligendi odio at perspiciatis dolores.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2">

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home