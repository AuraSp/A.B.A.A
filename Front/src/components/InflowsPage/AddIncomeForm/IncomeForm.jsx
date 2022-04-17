import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './incomeform.css'

function Form({ handlepopupClose }) {

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    //Išsiuntimo į - linkas
    let url = 'http://localhost:3000/api/v1/income';

    //Duomenų įvedimo informacija
    let data = {
        amount: amount,
        date: date,
        description: description
    }

    const budgetSchema = yup.object().shape({
        description: yup
            .string()
            .nullable(false)
            .typeError('Invalid Input: Must be letters')
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
            .strict()
            .required('Must enter description'),
        amount: yup
            .string()
            .nullable(false)
            .matches(/^(\d+(?:[\.\,]\d{1,1})?)$/, 'At least one number before comma/dot and after')
            .typeError('Must be numbers')
            .required(),
        date: yup
            .date()
            .nullable(false)
            .min(new Date(1990, 1, 1), 'Cannot use past date')
            .max(new Date(), "Cannot use future date")
            .typeError('Date must be entered')
            .required()
        // category: yup
        //     .string()
        //     .nullable(false)
        //     .strict()
        //     .required('Must be chosen')
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
    const onSubmit = () => {
        fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        Swal.fire({
            title: 'Statement successful',
            text: `New income has been created`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        reset(
            setDescription(),
            setAmount(),
            setDate()
        )
    }

    return (
        <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <span className='pb-1 px-1 border border-3 border-primary text-center'><GrTransaction /></span>
                    <span className='fs-5 ms-2'>New Transaction</span>
                    <span onClick={handlepopupClose} className='px-1 text-end'>x</span>
                </div>
                <div className='d-flex flex-row flex-nowrap justify-content-between w-25 pb-4 ms-3'>
                    <button className='outflowbtn bg-primary p-1 me-2'><BsArrowUpShort /></button><span>Outflows</span>
                    <button className='inflowbtn bg-danger p-1 ms-3 me-2'><BsArrowDownShort /></button><span>Inflows</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-start'>Description</label>
                    <input
                        {...register('description')}
                        type='text'
                        placeholder='Example: Netflix Subscription or Amazon Order'
                        onChange={(e) => setDescription(e.target.value)}
                        className='text-center rounded border p-1' />
                    <p className='p-0'>{errors.description?.message}</p>
                    <div className='info d-flex flex-row my-4'>
                        <div className='amountblock d-flex flex-column'>
                            <label className='text-start'>Amount</label>
                            <input
                                {...register('amount')}
                                type='string'
                                placeholder='35.00'
                                onChange={(e) => setAmount(e.target.value)}
                                className='text-center rounded border p-1' />
                            <p className='p-0'>{errors.amount?.message}</p>
                        </div>
                        <div className='dateblock d-flex flex-column'>
                            <label className='text-start'>Date</label>
                            <input
                                {...register('date')}
                                type='text'
                                placeholder='04/07/2022'
                                onChange={(e) => setDate(e.target.value)}
                                className='text-center rounded border p-1' />
                            <p className='p-0'>{errors.date?.message}</p>
                        </div>
                    </div>
                    <label className='text-start'>Category</label>
                    <select
                        defaultValue=''
                        className='border border-2 bg-transparent mb-5 p-1'>
                        <option>Food</option>
                    </select>
                    <div className='formfooter'>
                        <button
                            className='w-55 btn btn-primary'
                            type='submit'>Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Form