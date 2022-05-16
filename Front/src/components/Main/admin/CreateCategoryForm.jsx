import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addNewCategory } from '../../../api/lib/TransactionsAPI';

function CreateCategoryForm({handlepopupClose, userId, render, setRender}) {

  const [category, setCategory] = useState("");
  const [ text, setText] = useState("")
  
  const budgetSchema = yup.object().shape({
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


const onSubmit = async (data) => {
  if (category != "") { 

      Swal.fire({
          title: 'Išrašas sėkmingas!',
          text: 'Naujas pajamų išrašas pridėtas!',
          icon: 'success',
          confirmButtonText: 'Puiku!'
      });
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({text:category, value:category})
      };
        
        fetch('http://localhost:3000/api/v1/categories', requestOptions)
        .then(response => response.json())

      await addNewCategory(data, userId).then(setRender(!render))            //send data into database(depending on current UserId)
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


  return (
    <div>
        <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <div className='border border-3 border-primary rounded text-center'><GrTransaction /></div>
                    <h4 className='ms-5'>Naujas sąskaitos išrašas</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-start'>Kategoriją</label>
                    <input
                        {...register('category')}
                        defaultValue=''
                        onChange={(e) => setCategory(e.target.value)}
                        className='border bg-transparent text-muted'>
                    </input>
                    <p className=' p-0 text-danger'>{errors.category?.message}</p>
                    <div className='formfooter d-flex flex-row flex-wrap mt-5'>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-light'
                                type='submit' id="btn" disabled={!category}>Sukūrti
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
    </div>
  )
}

export default CreateCategoryForm