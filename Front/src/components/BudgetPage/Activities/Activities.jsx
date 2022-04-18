import React, { useState } from 'react';
import Inflows from './Inflows/Inflows';
import './activities.css';
import Outflows from './Outflows/Outflows';
import ActivitiesForm from './ActivitiesForm'

function Main() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className='main row px-5'>
            <div className='h-25 ps-3 pt-3 text-muted d-flex flex-row align-middle'>
                <p className='w-50 h-100'>Here you can add transactions into your account. Transactions include payments, paychecks etc. Every transaction is either incoming (inflow) or outgoing (outflow) and must have description, the category of the budget you would like to assign it to, date and amount</p>
                <div className='button ps-5 w-50 h-100 text-center'>
                    <button
                        onClick={togglePopup}
                        className='bg-primary text-light ps-3 pe-3 pt-2 pb-2'>+ Add Transaction</button>
                </div>
            </div>
            {/* first */}
            <div className='inflows border border-2 border-danger mx-auto p-5 shadow'>
                <Inflows />
            </div>
            {/* second
            <div className='outflows border border-2 border-primary my-5 mx-auto p-5 shadow'>
                <Outflows />
            </div> */}
            {isOpen &&
                <ActivitiesForm
                    handlepopupClose={togglePopup}
                />}
        </div>
    )
}

export default Main