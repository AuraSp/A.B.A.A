import React from 'react';
import { Link } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import Dashboard from './Dashboard.png';

import './Home.css'

function Home() {
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
            <Link to="/signin" className='m-2 mt-2 btn btn-light'>Log in</Link>
            <Link to="/signup" className='m-2 mt-2 btn btn-primary'>Sign up</Link>
          </div>
        </div>
        <div className="sidemenu">
          
          <div className="container">
            <div className="row m-4">
              <h2>Text</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam corporis eius laborum unde magni itaque, earum fuga nihil sequi vitae fugit provident quasi nisi commodi repellat obcaecati ducimus ipsa reprehenderit. Voluptatibus obcaecati animi qui veniam fugit nesciunt temporibus et. Cum dolore facilis sit totam iure eligendi excepturi porro quis harum inventore blanditiis obcaecati velit autem aut veritatis ad, id quasi. Minus non necessitatibus rerum harum dignissimos recusandae qui, natus, et dolorum sed quas nulla excepturi perspiciatis! Tempora illo dolore debitis suscipit ab excepturi sunt voluptates facilis dolores! Eum, ab veniam.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptas iure deserunt maxime corporis magni ratione eaque vel molestias dignissimos non omnis. Sed natus error ut, autem dicta necessitatibus libero! Dolorem fuga quasi aspernatur temporibus at incidunt beatae, sapiente officia cum accusamus ratione eos expedita corporis dolore eius maiores id labore tempore tenetur et? Optio nulla alias quis nam temporibus?
              </p>
              <div className='col-5'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit in animi, ratione consequuntur eius sed unde nam odio? Reprehenderit unde ullam rem. Aspernatur nemo voluptatum animi praesentium. Architecto, sit? Autem. Quod distinctio illum inventore autem quam eos porro, aliquam fuga doloremque alias assumenda voluptate cupiditate numquam illo veniam, corporis mollitia sequi corrupti perspiciatis sed eveniet! Voluptatem ad accusamus voluptates quasi.</p>
                <p>
                  Inventore aliquid ullam qui voluptas id ad sequi mollitia corrupti dicta sapiente, fugit nihil consequatur enim, esse nostrum. Quisquam similique voluptatem quae iusto dolorem quasi voluptatum consequatur maxime esse incidunt.
                </p>
              </div>
              <img src="https://www.zambianguardian.com/wp-content/uploads/2021/12/budget-696x365.jpg" className='col-5 w-50 h-50 m-2 rounded' alt="Budget" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta fugiat nemo pariatur dolores, sed id autem iusto tempora. Fuga sed voluptates molestias! Iure sequi eligendi odio at perspiciatis dolores.
              </p>
              <Link to="/dashboard"><img src={Dashboard} className="w-100 mb-5" alt="Dashboard" /></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home