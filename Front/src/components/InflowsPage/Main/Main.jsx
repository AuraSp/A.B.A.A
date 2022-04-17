import React, { useState } from 'react';
import Inflows from './Inflows/Inflows';
import './main.css';
import Outflows from './Outflows/Outflows';
import IncomeForm from '../AddIncomeForm/IncomeForm'

function Main() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='main row px-5'>
            <div className='ps-3 pt-5 text-muted d-flex flex-row'>
                <p className='m-0 w-50'>Here you can add transactions into your account. Transactions include payments, paychecks etc. Every transaction is either incoming (inflow) or outgoing (outflow) and must have description, the category of the budget you would like to assign it to, date and amount</p>
                <div className='button text-end pe-5'>
                    <button
                        onClick={togglePopup}
                        className='bg-primary text-light p-2'>+ Add Transaction</button>
                </div>
            </div>
            {/* first */}
            <div className='inflows border border-2 border-danger my-5 mx-auto p-4 shadow'>
                <Inflows />
                <div className='pe-5 text-end'>
                    <span>0 Results</span>
                </div>
            </div>
            {/* second */}
            <div className='outflows border border-2 border-primary my-5 mx-auto p-4 shadow'>
                <Outflows />
                <div className='pe-5 text-end'>
                    <span>0 Results</span>
                </div>
            </div>
            {isOpen &&
                <IncomeForm
                    handlepopupClose={togglePopup}
                />}
        </div>
    )
}

export default Main