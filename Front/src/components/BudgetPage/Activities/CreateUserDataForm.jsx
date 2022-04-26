import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import '../budgetmain.css';
import { getAllUsers, addNewIncome, addNewExpense } from '../../../api/lib/TransactionsAPI';

function CreateFlowsForm({ handlepopupClose, }) {

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [incomes, setIncomes] = useState(false);
    const [expenses, setExpenses] = useState(false);
    const [userId, setId] = useState([]);

    useEffect(() => {
        getAllUsers().then((res) => {
            const userdata = res.data.data.transactions; //Fetch all existing data from database
            setId(...userdata.map((data) => data._id)); //Take User Id
        });
    }, []);

    const budgetSchema = yup.object().shape({
        description: yup
            .string()
            .min(3, 'Must be at least 3 letters')
            .max(12, 'Must be less than 12 letters')
            .nullable(false)
            .typeError('Invalid Input: Must be letters')
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter description'),
        amount: yup
            .string()
            .nullable(false)
            .matches(/^[1-9]\d*((([,\.]\d{2}){1})?(\.\d{0,2})?)$/, 'Number to be bigger than 1 before comma/dot')
            .typeError('Invalid Input: Must be numbers')
            .required(),
        date: yup
            .date()
            .nullable(false)
            .min(new Date(1990, 1, 1), 'Cannot use past date')
            .max(new Date(), "Cannot use future date")
            .typeError('Date must have yyyy-mm-dd format and no blank')
            .required(),
        category: yup
            .string()
            .nullable(false)
            .strict()
            .required('Must be chosen')
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
    const onSubmit = async (data, amount) => {
        console.log(incomes);
        console.log(expenses);
        console.log(data);
        if (incomes) {
            console.log(data);
            Swal.fire({
                title: 'Statement successful',
                text: `New income has been created`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });

            await addNewIncome(data, userId);

            handlepopupClose(false);
            reset(
                setDescription(),
                // setAmount(),
                setDate(),
                setCategory()
            )
        } else {
            // data.push({ amount: expense })

            Swal.fire({
                title: 'Statement successful',
                text: `New expense has been created`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })

            await addNewExpense(data, userId);

            handlepopupClose(false);
            reset(
                setDescription(),
                // setAmount(),
                setDate(),
                setCategory()
            )
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

    return (
        <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <span className='border border-3 border-primary text-center'><GrTransaction /></span>
                    <h4 className='ms-5'>New Transaction</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
                <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-25 pb-4 ms-3'>
                    <button
                        onClick={ExpensesHandler}
                        className={expenses ? 'outflowbtn bg-danger' : 'outflowbtn'}><BsArrowUpShort /></button><span className='w-auto me-3'>Expense</span>
                    <button
                        onClick={IncomesHandler}
                        className={incomes ? 'inflowbtn bg-primary' : 'inflowbtn'} ><BsArrowDownShort /></button><span className='w-auto'>Income</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-start'>Description</label>
                    <input
                        {...register('description')}
                        type='text'
                        placeholder='Example: Netflix Subscription or Amazon Order'
                        onChange={(e) => setDescription(e.target.value)}
                        className='border' />
                    <p className='p-0 text-danger'>{errors.description?.message}</p>
                    <div className='info d-flex flex-row my-4'>
                        <div className='amountblock d-flex flex-column'>
                            <label className='text-start'>Amount</label>
                            <input
                                {...register('amount')}
                                type='string'
                                placeholder='€35.00'
                                onChange={(e) => setAmount(e.target.value)}
                                className='border' />
                            <p className='p-0 text-danger'>{errors.amount?.message}</p>
                        </div>
                        <div className='dateblock d-flex flex-column'>
                            <label className='text-start'>Date</label>
                            <input
                                {...register('date')}
                                type='text'
                                placeholder='04-07-2022'
                                onChange={(e) => setDate(e.target.value)}
                                className='border' />
                            <p className='p-0 text-danger'>{errors.date?.message}</p>
                        </div>
                    </div>
                    <label className='text-start'>Category</label>
                    <select
                        {...register('category')}
                        onChange={(e) => setCategory(e.target.value)}
                        defaultValue=''
                        className='border bg-transparent text-muted'>
                        <option value='' disabled>--Choose your category--</option>
                        <option value='Food'>Food</option>
                        <option value='Rent'>Rent</option>
                    </select>
                    <p className='p-0 text-danger'>{errors.category?.message}</p>
                    <div className='formfooter mt-5'>
                        <button
                            className='w-55 btn btn-primary'
                            type='submit'>Create
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CreateFlowsForm