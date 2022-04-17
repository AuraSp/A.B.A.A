import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';

import './inflows.css';

function Inflows() {
    return (
        <div className='row d-flex flex-row flex-nowrap'>
            <div className='sidemenu d-flex flex-column flex-wrap pt-4 shadow'>
                <a className='border border-danger p-4 mb-5' href='#'>LOGO</a>
                {/* <a className='rounded-circle border border-warning p-2 mt-4 mb-5' href='#'>ICON1</a> */}
                <a className='border border-primary p-4 mt-5' href='#'>ICON2</a>
                <a className='border border-secondary p-4 mt-5' href='#'>ICON3</a>
            </div>
            <div className='maincontent'>
                <Header />
                <Main />
            </div>
        </div>
    )
}

export default Inflows