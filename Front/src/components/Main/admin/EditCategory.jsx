import React, { useState, useEffect } from 'react'
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function EditCategory({defaultData, subId, onCancel}) {

    const [value, setValue] = useState(defaultData.value)
    const [editpopup, setEditPopUp] = useState(false);

    console.log(subId);

    const toggleEditPopUp = () => {
        setEditPopUp(!editpopup)
    }

    
    

    // function onSubmit(e) {

    //     const requestOptions = {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json'},
    //       body: JSON.stringify({value: value, text: text})
    //     };

    //     fetch('http://localhost:3000/api/v1/categories', requestOptions)
    //     .then(response => response.json())
    //   }

    // const schema = yup.object().shape({
    //     value: yup
    //         .string()
    //         .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
    //         .max(10, 'Galimas maksimalus 10-ties raidžių kiekis')
    //         .transform((_, description) => {
    //             if (!description) {
    //                 return errors.description
    //             } else if (description.includes(' ')) {
    //                 return description.replace(' ', '')
    //             }
    //             return description
    //         })
    //         .nullable(false)
    //         .strict()
    //         .required(),
    //     text: yup
    //         .string()
    //         .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
    //         .max(10, 'Galimas maksimalus 10-ties raidžių kiekis')
    //         .transform((_, description) => {
    //             if (!description) {
    //                 return errors.description
    //             } else if (description.includes(' ')) {
    //                 return description.replace(' ', '')
    //             }
    //             return description
    //         })
    //         .nullable(false)
    //         .strict()
    //         .required()
    // })

  return (
        <>
                <td>

                    <input
                        // {...register('value')}
                        className='text-center'
                        type='text'
                        defaultValue={defaultData.value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {/* {errors.description &&
                        <p className='error1 p-1 pt-4'>{errors.description?.message}</p>} */}
                </td>
                <td className='editbuttons'>
                    <button onClick={() => onCancel()} className='btn border-0 me-1'><MdCancel /></button>
                    <button className='btn border-0 me-1' type='submit'><MdOutlineCheckBox /></button>
                    <button onClick={toggleEditPopUp} className='btn bg-transparent text-dark'>...</button>
                    {editpopup &&
                        <div className='tools-content'>
                            <div>
                                <button onClick={() => onCancel()} className='btn bg-transparent border-0'><MdCancel className='text-danger me-3' />
                                    <span className='text-secondary'>Atšaukti</span>
                                </button>
                            </div>
                            <div>
                                <button className='btn bg-transparent border-0'><MdOutlineCheckBox className='text-primary me-3' />
                                    <span className='text-secondary'>Koreguoti</span>
                                </button>
                            </div>
                        </div>
                    }
                </td >
        </>
    )
}

export default EditCategory