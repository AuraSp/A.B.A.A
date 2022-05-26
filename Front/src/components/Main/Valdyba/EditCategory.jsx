import React, { useState } from 'react'
import { MdCancel, MdOutlineCheckBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './Styles/admin.css'

function EditCategory({ defaultData, id, data, subId, onCancel, onSubmit }) {
    const [value, setValue] = useState(defaultData.value)
    const [editpopup, setEditPopUp] = useState(false);

    const editFlows = () => {
        let cateSet = {
            value: value,
        };
        onSubmit(id, subId, cateSet, defaultData)
    }


    // console.log(subId);

    const toggleEditPopUp = () => {
        setEditPopUp(!editpopup)
    }

    const schema = yup.object().shape({
        value: yup
            .string()
            .min(2, 'Galimas minimalus 2-iejų raidžių kiekis')
            .max(30, 'Galimas maksimalus 30-ties raidžių kiekis')
            .trim('Negalima įtraukti daugelio tarpų iš eilės nepridedant antro žodžio')
            .nullable(false)
            .strict()
            .required()
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <tr className='editcategory'>
            <td>
                <input
                    {...register('value')}
                    className='text-center'
                    type='text'
                    defaultValue={defaultData.value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {errors.value &&
                    <p className='adminerror1 p-1 pt-4'>{errors.value?.message}</p>}
            </td>
            <td className='editbuttons'>
                <button onClick={() => onCancel()} className='btn border-0 me-1 fs-5'><MdCancel /></button>
                <button onClick={handleSubmit(editFlows)} className='btn border-0 me-1 fs-5' type='submit'><MdOutlineCheckBox /></button>
                <button onClick={toggleEditPopUp} className='btn bg-transparent text-dark'>...</button>
                {editpopup &&
                    <div className='tools-content'>
                        <div>
                            <button onClick={() => onCancel()} className='btn bg-transparent border-0'><MdCancel className='text-danger me-3' />
                                <span className='text-secondary'>Atšaukti</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={handleSubmit(editFlows)} className='btn bg-transparent border-0'><MdOutlineCheckBox className='text-primary me-3' />
                                <span className='text-secondary'>Koreguoti</span>
                            </button>
                        </div>
                    </div>
                }
            </td >
        </tr>
    )
}

export default EditCategory