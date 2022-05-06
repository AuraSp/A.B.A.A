import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
//import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import '../budgetmain.css';
import { getAllUsers, addNewIncome, addNewExpense } from '../../../api/lib/TransactionsAPI';

function CreateFlowsForm({ handlepopupClose, render, setRender }) {

    const [incomes, setIncomes] = useState(false);
    const [expenses, setExpenses] = useState(false);
    const [userId, setId] = useState([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);

    useEffect(() => {
        getAllUsers().then((res) => {
            const userdata = res.data.data.transactions; //Fetch all existing data from database
            setId(...userdata.map((data) => data._id)); //Take User Id
        });
    }, []);

    const budgetSchema = yup.object().shape({
        description: yup
            .string()
            .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
            .max(30, 'Galimas maksimalus 30-ties raidžių kiekis')
            .nullable(false)
            .strict()
            .required(),
        amount: yup
            .string()
            .nullable(false)
            .matches(/^[0-9]\d*(((\.\d{2}){0})?(.\d{0,2})?)$/, 'Suma tik teigiama, galimi tik skaičiai ir turi turėti dvejus skaitmenis po taško')
            .strict()
            .typeError('fvefveve')
            .required(),
        // date: yup
        //     .date()  
        //     .nullable(false)
        //     .min(new Date(1990, 1, 1), 'Data negali būti senesnė nei 1989 metų')
        //     .max(new Date(), "Data privalo būti ne vėlesnė kaip šios dienos")
        //     .required(),
        category: yup
            .string()
            .nullable(false)
            .strict()
            .required('Pasirinkimas privalomas!')
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(budgetSchema)
    });

    //Duomenų siuntimas į duombazę
    const onSubmit = async (data) => {
        if (incomes) { // if choosen incomes type button

            Swal.fire({
                title: 'Išrašas sėkmingas!',
                text: 'Naujas pajamų išrašas pridėtas!',
                icon: 'success',
                confirmButtonText: 'Puiku!'
            });

            await addNewIncome(data, userId).then(setRender(!render))            //send data into database(depending on current UserId)
            handlepopupClose(false); //close create-pop-up after submit
            reset(''); //reset input values
        } else if (expenses) { // if choosen incomes type button

            Swal.fire({
                title: 'Išrašas sėkmingas!',
                text: 'Naujas išlaidų išrašas pridėtas!',
                icon: 'success',
                confirmButtonText: 'Puiku!'
            })

            await addNewExpense(data, userId).then(setRender(!render)); //send data into database(depending on current UserId)

            handlepopupClose(false); //close create-pop-up after submit
            reset(''); //reset input values
        } else {

            Swal.fire({
                title: 'Išrašas nesėkmingas!',
                text: 'Privaloma pasirinkti išrašo tipą!',
                icon: 'warning',
                confirmButtonText: 'Pasirinkti'
            })
        }
    }

    const IncomesHandler = (e) => {
        e.preventDefault()
        setIncomes(true);
        setExpenses(false);
    };
    const ExpensesHandler = (e) => {
        e.preventDefault()
        setIncomes(false);
        setExpenses(true);
    };

    const options = [
        { value: 'Išsiėmimas', text: 'Pinigų išsiėmimas' },
        { value: 'Drabužiai', text: 'Rūbai/Batai' },
        { value: 'Maistas/Gėrimai', text: 'Maistas/Gėrimai' },
        { value: 'Elektronika', text: 'Elektronika' },
        { value: 'Dovanos', text: 'Dovanos' },
        { value: 'Namų priežiūra', text: 'Namų priežiūra' },
        { value: 'Sąskaitos/Mokesčiai', text: 'Sąskaitos/Mokesčiai' },
        { value: 'Nuoma', text: 'Namo nuoma' },
        { value: 'Santaupos', text: 'Santaupos' },
        { value: 'Alga', text: 'Alga' }
    ]


    return (
        <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <div className='border border-3 border-primary rounded text-center'><GrTransaction /></div>
                    <h4 className='ms-5'>Naujas sąskaitos išrašas</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
                <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-25 pb-4 ms-4'>
                    <button
                        onClick={ExpensesHandler}
                        className={expenses ? 'outflowbtn bg-danger me-2' : 'outflowbtn me-2'}><BsArrowUpShort /></button><span className='w-auto me-3'>Išlaidos</span>
                    <button
                        onClick={IncomesHandler}
                        className={incomes ? 'inflowbtn bg-primary me-2' : 'inflowbtn me-2'} ><BsArrowDownShort /></button><span className='w-auto'>Pajamos</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-start'>Aprašymas</label>
                    <input
                        {...register('description')}
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Pavyzdys: Netflix abonementas ar Amazon užsakymas'
                        className='border' />
                    <p className='error p-0 text-danger'>{errors.description?.message}</p>
                    <div className='info d-flex flex-row my-4'>
                        <div className='amountblock d-flex flex-column'>
                            <label className='text-start'>Suma</label>
                            <input
                                {...register('amount')}
                                onChange={(e) => setAmount(e.target.value)}
                                type='number'
                                placeholder='0.00'
                                step="0.01"
                                className='border' />
                            <p className=' p-0 text-danger'>{errors.amount?.message}</p>
                        </div>
                        <div className='dateblock d-flex flex-column'>
                            <label className='text-start'>Data</label>
                            <input
                                {...register('date')}
                                type='date'
                                defaultValue={today}
                                min='1990-01-01'
                                max='2030-01-01'
                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                className='border' ></input>
                            <p className=' p-0 text-danger'>{errors.date?.message}</p>
                        </div>
                    </div>
                    <label className='text-start'>Kategoriją</label>
                    <select
                        {...register('category')}
                        defaultValue=''
                        onChange={(e) => setCategory(e.target.value)}
                        className='border bg-transparent text-muted'>
                        <option value='' disabled>--Pasirinkite kategoriją--</option>
                        {options.map(item => {
                            return (<option key={item.value} value={item.value}>{item.text}</option>)
                        })}
                    </select>
                    <p className=' p-0 text-danger'>{errors.category?.message}</p>
                    <div className='formfooter d-flex flex-row flex-wrap mt-5'>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-light'
                                type='submit' id="btn" disabled={!description || !amount || !category}>Sukūrti
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

export default CreateFlowsForm