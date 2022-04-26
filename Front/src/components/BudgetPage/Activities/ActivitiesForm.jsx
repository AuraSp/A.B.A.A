// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { GrTransaction } from "react-icons/gr";
// import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// import './activities.css'

// function ActivitiesForm({ handlepopupClose }) {

//     const [amount, setAmount] = useState('');
//     const [date, setDate] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     // const [outflows, setOutflows] = useState('');
//     // const [inflows, setInflows] = useState('');

//     // // Išsiuntimo į - linkas
//     // let incomeurl = 'http://localhost:3000/api/v1/income';
//     // let costurl = 'http://localhost:3000/api/v1/cost';

//     //Duomenų įvedimo informacija
//     let data = {
//         description: description,
//         category: category,
//         date: date,
//         amount: amount
//     }

//     const budgetSchema = yup.object().shape({
//         description: yup
//             .string()
//             .nullable(false)
//             .typeError('Invalid Input: Must be letters')
//             .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s]+$/, "Only letters are allowed for this field and no blank")
//             .strict()
//             .required('Must enter description'),
//         amount: yup
//             .string()
//             .nullable(false)
//             .matches(/^(\d+(?:[\.\,]\d{1,2})?)$/, 'At least one number before comma/dot and after')
//             .typeError('Must be numbers')
//             .required(),
//         date: yup
//             .date()
//             .nullable(false)
//             .min(new Date(1990, 1, 1), 'Cannot use past date')
//             .max(new Date(), "Cannot use future date")
//             .typeError('Date must be entered')
//             .required(),
//         category: yup
//             .string()
//             .nullable(false)
//             .strict()
//             .required('Must be chosen')
//     })

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm({
//         resolver: yupResolver(budgetSchema)
//     });

      

//     //Duomenų siuntimas į duombazę 
    
//     // function sendInflowsbutton(){
//     //     let url = 'http://localhost:3000/api/v1/income'
//     //     console.log(url)
//     //     return url
//     // }
//     // function sendOutflowsbutton(){
//     //     let url = 'http://localhost:3000/api/v1/cost'
//     //     console.log(url)
//     //     return url
//     // }

//     // function changeUrl(){
//     //     let url = sendInflowsbutton()
//     //     let url2 = sendOutflowsbutton()
//     //     if(url = 'http://localhost:3000/api/v1/income'){
//     //         sendOutflowsbutton = null
//     //         return url
//     //     }if(url2 = 'http://localhost:3000/api/v1/cost'){
//     //         sendInflowsbutton = null
//     //         return url2
//     //     }
       
//     // }

//     // const onSubmit = () => {
//     //     if(inflows){
//     //         fetch(incomeurl,
//     //             {
//     //                 method: 'POST',
//     //                 headers: { 'Content-Type': 'application/json' },
//     //                 body: JSON.stringify(data)
//     //             })
//     //             .then(response => response.json())
//     //             .then(data => {
//     //                 console.log('Success:', data);
//     //             })
//     //             .catch((error) => {
//     //                 console.error('Error:', error);
//     //             });
//     //         Swal.fire({
//     //             title: 'Statement successful',
//     //             text: `New income has been created`,
//     //             icon: 'success',
//     //             confirmButtonText: 'Ok'
//     //         });
//     //         handlepopupClose(false);
//     //         reset(
//     //             setDescription(),
//     //             setAmount(),
//     //             setDate(),
//     //             setCategory()
//     //         );
//     //     }else if(outflows){
//     //         fetch(costurl,
//     //             {
//     //                 method: 'POST',
//     //                 headers: { 'Content-Type': 'application/json' },
//     //                 body: JSON.stringify(data)
//     //             })
//     //             .then(response => response.json())
//     //             .then(data => {
//     //                 console.log('Success:', data);
//     //             })
//     //             .catch((error) => {
//     //                 console.error('Error:', error);
//     //             });
//     //         Swal.fire({
//     //             title: 'Statement successful',
//     //             text: `New income has been created`,
//     //             icon: 'success',
//     //             confirmButtonText: 'Ok'
//     //         });
//     //         handlepopupClose(false);
//     //         reset(
//     //             setDescription(),
//     //             setAmount(),
//     //             setDate(),
//     //             setCategory()
//     //         );
//     //     }
           
        
//     // }

    

//     return (
//         <div className='popupform d-flex flex-column flex-nowrap'>
//             <div className='formblock p-4'>
//                 <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
//                     <span className='border border-2 border-primary text-center'><GrTransaction /></span>
//                     <span className='font-bolder fs-5 ms-3'>New Transaction</span>
//                     <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
//                 </div>
//                 {/* <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-25 pb-4 ms-3'>
//                     <button onClick={setInflows}
//                             className='inflowbtn p-1 me-2'><BsArrowUpShort /></button><span>Inflows</span>
//                     <button onClick={setOutflows}
//                         className='outflowbtn p-1 ms-3 me-2'><BsArrowDownShort /></button><span>Outflows</span>
//                 </div> */}
//                 <form  className='d-flex flex-column flex-wrap text-center'>
//                     <label className='text-start'>Description</label>
//                     <input
//                         {...register('description')}
//                         type='text'
//                         placeholder='Example: Netflix Subscription or Amazon Order'
//                         onChange={(e) => setDescription(e.target.value)}
//                         className='text-center border' />
//                     <p className='p-0 text-danger'>{errors.description?.message}</p>
//                     <div className='info d-flex flex-row my-4'>
//                         <div className='amountblock d-flex flex-column'>
//                             <label className='text-start'>Amount</label>
//                             <input
//                                 {...register('amount')}
//                                 type='string'
//                                 placeholder='€35.00'
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 className='text-center border' />
//                             <p className='p-0 text-danger'>{errors.amount?.message}</p>
//                         </div>
//                         <div className='dateblock d-flex flex-column'>
//                             <label className='text-start'>Date</label>
//                             <input
//                                 {...register('date')}
//                                 type='text'
//                                 placeholder='04-07-2022'
//                                 onChange={(e) => setDate(e.target.value)}
//                                 className='text-center border' />
//                             <p className='p-0 text-danger'>{errors.date?.message}</p>
//                         </div>
//                     </div>
//                     <label className='text-start'>Category</label>
//                     <select
//                         {...register('category')}
//                         onChange={(e) => setCategory(e.target.value)}
//                         defaultValue=''
//                         className='border bg-transparent mb-5 text-muted'>
//                         <option value='' disabled>--Choose your category--</option>
//                         <option value='Food'>Food</option>
//                         <option value='Rent'>Rent</option>
//                     </select>
//                     <p className='p-0 text-danger'>{errors.category?.message}</p>
//                     <div className='formfooter'>
//                         <button
//                             className='w-55 btn btn-primary'
//                             type='submit'>Create
//                         </button>
//                     </div>
//                 </form>
//             </div >
//         </div >
//     )
// }

// export default ActivitiesForm