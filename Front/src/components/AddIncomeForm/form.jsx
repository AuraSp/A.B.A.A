import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
// import { useForm } from "react-hook-form";

function Form() {

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');

    //Išsiuntimo į - linkas
    let url = 'http://localhost:3000/api/v1/income';

    //Duomenų įvedimo informacija
    let data = {
        amount: amount,
        date: date,
        name: name
    }

    // const {
    //     reset,
    // } = useForm();

    //Duomenų siuntimas į duombazę
    const onSubmit = (e) => {
        e.preventDefault()
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
    }

    return (
        <div className='row'>
            <div>
                <Link to="/" className='p-3 fs-4'>Home</Link>
                <Link to="/allincomes" className='p-3 fs-4'>All incomes</Link>
            </div>
            
            <form onSubmit={onSubmit} className='border border-2 border-muted p-3 d-flex flex-column flex-wrap w-25'>
                <input
                    type='number'
                    placeholder='Income amount'
                    onChange={(e) => setAmount(e.target.value)}
                    className='text-center m-1' />
                <input
                    type='text'
                    placeholder='Income date'
                    onChange={(e) => setDate(e.target.value)}
                    className='text-center m-1' />
                <input
                    type='text'
                    placeholder='Income name'
                    onChange={(e) => setName(e.target.value)}
                    className='text-center m-1' />

                <div>
                    <button
                        type='submit'>Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form