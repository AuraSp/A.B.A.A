import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { addNewIncome, addNewExpense } from '../../../api/lib/TransactionsAPI';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



function CreateForm({handlepopupClose}) {
    const [incomes, setIncomes] = useState(false);
    const [expenses, setExpenses] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [load, setLoad] = useState(true)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver()
    });

  return (
    <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <div className='border border-3 border-primary rounded text-center'><GrTransaction /></div>
                    <h4 className='ms-5'>Naujas sąskaitos išrašas</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
              
                <form onSubmit={handleSubmit()} className='d-flex flex-column flex-wrap text-center'>
                    <div className='formfooter d-flex flex-row flex-wrap mt-5'>
                        <div className='me-4'>
                            {/* <button
                                className='w-55 btn text-light'
                                type='submit' id="btn" disabled={!description || !amount || !category}>Sukūrti
                            </button> */}
                            <button
                                className='w-55 btn text-light'
                                type='submit' id="btn">Sukūrti
                            </button>
                        </div>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-dark'
                                onClick={handlepopupClose}
                                type='submit'>Atšaukti
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
  )
}

export default CreateForm